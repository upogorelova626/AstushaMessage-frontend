import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TuiObscured } from '@taiga-ui/cdk/directives/obscured';
import { TuiButton, TuiDataList, TuiDropdown, TuiOptGroup, TuiOption } from '@taiga-ui/core';
import { TuiChevron } from '@taiga-ui/kit';
import { ActionsWithChatService } from '../../../chat/services/actions-with-chat.service';

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

  protected readonly actionsFirst: readonly Action[] = [
    {
      title: 'Архивировать чат',
      iconStart: '@tui.archive',
      action: () => {},
    },
    {
      title: 'Без звука',
      iconStart: '@tui.bell-off',
      action: () => {
        this.actionsWithChatService.turnOffSound();
      },
    },
    {
      title: 'Закрепить чат',
      iconStart: '@tui.pin',
      action: () => {},
    },
    {
      title: 'Пометить как непрочитанное',
      iconStart: '@tui.message-square-text',
      action: () => {},
    },
    {
      title: 'Удалить из избранного',
      iconStart: '@tui.heart-off',
      action: () => {
        this.actionsWithChatService.deleteFromFavourites();
      },
    },
    {
      title: 'Изменить список',
      iconStart: '@tui.images',
      action: () => {
        this.actionsWithChatService.changeList();
      },
    },
  ];

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

  protected readonly open = signal(false);
  protected readonly selected = signal<Action | null>(null);
  protected readonly buttonLabel = computed(() => this.selected()?.title ?? 'Choose');

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
    this.selected.set(action);
    this.open.set(false);
    action.action?.();
  }
}
