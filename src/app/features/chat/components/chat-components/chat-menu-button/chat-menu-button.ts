import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TuiActiveZone } from '@taiga-ui/cdk/directives/active-zone';
import { TuiObscured } from '@taiga-ui/cdk/directives/obscured';
import {
  TuiButton,
  TuiHint,
  TuiDataList,
  TuiDropdown,
  TuiOption,
  TuiAppearance,
} from '@taiga-ui/core';
import { OpenedChatService } from '../../../services/opened-chat.service';
import { ActionsWithChatService } from '../../../services/actions-with-chat.service';
import { ChatRemovalService } from '../../../services/chat-removal.service';

interface Action {
  readonly title: string;
  readonly iconStart: string;
  readonly iconEnd?: string;
  readonly action?: () => void;
}

interface EditChatParametrs {
  chatIsOpen: boolean;
  chatId?: string;
}

@Component({
  selector: 'app-chat-menu-button',
  imports: [
    TuiButton,
    TuiHint,
    TuiDataList,
    TuiDropdown,
    TuiObscured,
    TuiActiveZone,
    TuiOption,
    TuiAppearance,
  ],
  templateUrl: './chat-menu-button.html',
  styleUrl: './chat-menu-button.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMenuButton {
  private readonly openedChatService = inject(OpenedChatService);
  private readonly actionsWithChat = inject(ActionsWithChatService);
  private readonly chatRemovalService = inject(ChatRemovalService);

  private readonly chat = this.openedChatService.chat;

  protected readonly actionsFirst = computed<readonly Action[]>(() => [
    {
      title: 'Данные контакта',
      iconStart: '@tui.info',
      action: () => this.actionsWithChat.openContactDetailsPage(),
    },
    {
      title: 'Поиск',
      iconStart: '@tui.search',
      action: () => this.actionsWithChat.openSearchMessageInChatPage(),
    },
    {
      title: 'Выбрать сообщения',
      iconStart: '@tui.square-check',
      action: () => this.actionsWithChat.selectChatMessages(),
    },
    {
      title: this.chat()!.settings.isMuted ? 'Включить звук' : 'Без звука',
      iconStart: this.chat()!.settings.isMuted ? '@tui.bell' : '@tui.bell-off',
      iconEnd: this.chat()!.settings.isMuted ? undefined : '@tui.chevron-right',
      action: () => this.actionsWithChat.turnOffSound(),
    },
    {
      title: 'Исчезающие сообщения',
      iconStart: '@tui.clock-fading',
      action: () => this.actionsWithChat.turnOffDisappearingMessages(),
    },
    {
      title: 'Тема чата',
      iconStart: '@tui.palette',
      action: () => this.actionsWithChat.openChatThemesPage(),
    },
    {
      title: this.chat()!.settings.isFavorite ? 'Удалить из избранного' : 'Добавить в избранное',
      iconStart: this.chat()!.settings.isFavorite ? '@tui.heart-off' : '@tui.heart',
      action: () => {
        this.actionsWithChat.changeFavorite({
          chatIsOpen: true,
          isFavorite: !this.chat()!.settings.isFavorite,
        });
      },
    },
    {
      title: 'Изменить список',
      iconStart: '@tui.images',
      iconEnd: '@tui.chevron-right',
      action: () => this.actionsWithChat.changeList(),
    },
    {
      title: 'Экспорт чата',
      iconStart: '@tui.download',
      action: () => this.actionsWithChat.exportChat(),
    },
    {
      title: 'Закрыть окно чата',
      iconStart: '@tui.circle-x',
      action: () => this.actionsWithChat.closeChat(),
    },
  ]);

  protected readonly actionsSecond: readonly Action[] = [
    {
      title: 'Отправить ссылку на звонок',
      iconStart: '@tui.link-2',
      action: () => {
        this.actionsWithChat.sendCallLink();
      },
    },
    {
      title: 'Новый групповой звонок',
      iconStart: '@tui.user-round-plus',
      action: () => {
        this.actionsWithChat.startNewGroupCall();
      },
    },
  ];

  protected readonly actionsThird: readonly Action[] = [
    {
      title: 'Пожаловаться',
      iconStart: '@tui.thumbs-down',
      action: () => {
        this.actionsWithChat.complain();
      },
    },
    {
      title: 'Заблокировать',
      iconStart: '@tui.ban',
      action: () => {
        this.actionsWithChat.block();
      },
    },
    {
      title: 'Очистить чат',
      iconStart: '@tui.circle-minus',
      action: () => {
        this.chatRemovalService.cleanChat({ chatIsOpen: true });
      },
    },
    {
      title: 'Удалить чат',
      iconStart: '@tui.trash',
      action: () => {
        this.chatRemovalService.deleteChat();
      },
    },
  ];

  protected readonly open = signal(false);
  protected readonly selected = signal<Action | null>(null);

  protected onClick(): void {
    this.open.update((open) => !open);
  }

  protected onObscured(obscured: boolean): void {
    if (obscured) {
      this.open.set(false);
    }
  }

  protected onActiveZone(active: boolean): void {
    if (!active) {
      this.open.set(false);
    }
  }

  protected onSelect(action: Action): void {
    this.selected.set(action);
    this.open.set(false);
    action.action?.();
  }
}
