import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { TuiObscured } from '@taiga-ui/cdk/directives/obscured';
import { TuiButton, TuiDataList, TuiDropdown, TuiOptGroup, TuiOption } from '@taiga-ui/core';
import { TuiChevron } from '@taiga-ui/kit';

import { ActionsWithChatService } from '../../../chat/services/actions-with-chat.service';
import { Chat } from '../../../../shared/interfaces';

interface Action {
  readonly title: string;
  readonly iconStart: string;
  readonly action?: () => void;
}

@Component({
  selector: 'app-chat-actions-button',
  imports: [TuiButton, TuiDataList, TuiDropdown, TuiObscured, TuiChevron, TuiOptGroup, TuiOption],
  templateUrl: './chat-actions-button.html',
  styleUrl: './chat-actions-button.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.menu-open]': 'open()',
  },
})
export class ChatActionsButton {
  private readonly actionsWithChatService = inject(ActionsWithChatService);

  readonly chat = input.required<Chat>();

  protected readonly open = signal(false);

  protected readonly actionsFirst = computed<readonly Action[]>(() => [
    {
      title: this.chat().settings.isArchived ? 'Разархивировать чат' : 'Архивировать чат',
      iconStart: '@tui.archive',
      action: () => {
        this.actionsWithChatService.archiveChat(this.chat().id, !this.chat().settings.isArchived);
      },
    },
    {
      title: this.chat().settings.isMuted ? 'Включить звук' : 'Без звука',
      iconStart: this.chat().settings.isMuted ? '@tui.bell' : '@tui.bell-off',
      action: () => {
        this.actionsWithChatService.turnOffSound();
      },
    },
    {
      title: this.chat().settings.isPinned ? 'Открепить чат' : 'Закрепить чат',
      iconStart: '@tui.pin',
      action: () => {
        this.actionsWithChatService.pinChat(this.chat().id, !this.chat().settings.isPinned);
      },
    },
    {
      title: this.chat().settings.isMarkedUnread
        ? 'Пометить как прочитанное'
        : 'Пометить как непрочитанное',
      iconStart: '@tui.message-square-text',
      action: () => {},
    },
    {
      title: this.chat().settings.isFavorite ? 'Удалить из избранного' : 'Добавить в избранное',
      iconStart: this.chat().settings.isFavorite ? '@tui.heart-off' : '@tui.heart',
      action: () => {
        this.actionsWithChatService.changeFavorite({
          chatIsOpen: false,
          chatId: this.chat().id,
          isFavorite: !this.chat().settings.isFavorite,
        });
      },
    },
    {
      title: 'Изменить список',
      iconStart: '@tui.images',
      action: () => {
        this.actionsWithChatService.changeList();
      },
    },
  ]);

  protected readonly actionsSecond: readonly Action[] = [
    {
      title: 'Заблокировать',
      iconStart: '@tui.ban',
      action: () => {
        this.actionsWithChatService.block();
      },
    },
    {
      title: 'Очистить чат',
      iconStart: '@tui.circle-minus',
      action: () => {
        this.actionsWithChatService.cleanChat();
      },
    },
    {
      title: 'Удалить чат',
      iconStart: '@tui.trash',
      action: () => {
        this.actionsWithChatService.deleteChat();
      },
    },
  ];

  protected onClick(event: Event): void {
    event.stopPropagation();
    this.open.update((open) => !open);
  }

  protected onObscured(obscured: boolean): void {
    if (obscured) {
      this.open.set(false);
    }
  }

  protected onSelect(action: Action): void {
    this.open.set(false);
    action.action?.();
  }
}
