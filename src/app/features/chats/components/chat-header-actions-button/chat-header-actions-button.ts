import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TuiActiveZone, TuiObscured } from '@taiga-ui/cdk';
import {
  TuiButton,
  TuiDataList,
  TuiDropdown,
  TuiOptGroup,
  TuiOption,
  TuiTitle,
} from '@taiga-ui/core';

interface Action {
  readonly title: string;
  readonly icon: string;
  action?: () => void;
}

@Component({
  selector: 'app-chat-header-actions-button',
  imports: [
    TuiActiveZone,
    TuiButton,
    TuiDataList,
    TuiDropdown,
    TuiObscured,
    TuiTitle,
    TuiOptGroup,
    TuiOption,
  ],
  templateUrl: './chat-header-actions-button.html',
  styleUrl: './chat-header-actions-button.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatHeaderActionsButton {
  protected readonly actions: readonly Action[] = [
    {
      title: 'Новая группа',
      icon: '@tui.user-round-plus',
    },
    {
      title: 'Избранные сообщения',
      icon: '@tui.star',
    },
    {
      title: 'Выбрать чаты',
      icon: '@tui.square-check',
    },
  ];

  protected readonly actionsSecond: readonly Action[] = [
    {
      title: 'Блокировка приложения',
      icon: '@tui.lock-keyhole',
    },
    {
      title: 'Выйти',
      icon: '@tui.door-open',
    },
  ];

  protected readonly open = signal(false);

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

  protected onSelect(): void {
    this.open.set(false);
  }
}
