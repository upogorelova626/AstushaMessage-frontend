import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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

interface Action {
  readonly title: string;
  readonly iconStart: string;
  readonly iconEnd?: string;
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
  protected readonly actionsFirst: readonly Action[] = [
    {
      title: 'Данные контакта',
      iconStart: '@tui.info',
    },
    {
      title: 'Поиск',
      iconStart: '@tui.search',
    },
    {
      title: 'Выбрать сообщения',
      iconStart: '@tui.square-check',
    },
    {
      title: 'Без звука',
      iconStart: '@tui.bell-off',
      iconEnd: '@tui.chevron-right',
    },
    {
      title: 'Исчезающие сообщения',
      iconStart: '@tui.clock-fading',
    },
    {
      title: 'Тема чата',
      iconStart: '@tui.palette',
    },
    {
      title: 'Удалить из Избранного',
      iconStart: '@tui.heart-off',
    },
    {
      title: 'Изменить список',
      iconStart: '@tui.images',
      iconEnd: '@tui.chevron-right',
    },
    {
      title: 'Экспорт чата',
      iconStart: '@tui.download',
    },
    {
      title: 'Закрыть окно чата',
      iconStart: '@tui.circle-x',
    },
  ];

  protected readonly actionsSecond: readonly Action[] = [
    { title: 'Отправить ссылку на звонок', iconStart: '@tui.link-2' },
    { title: 'Новый групповой звонок', iconStart: '@tui.user-round-plus' },
  ];

  protected readonly actionsThird: readonly Action[] = [
    { title: 'Пожаловаться', iconStart: '@tui.thumbs-down' },
    { title: 'Заблокировать', iconStart: '@tui.ban' },
    { title: 'Очистить чат', iconStart: '@tui.circle-minus' },
    { title: 'Удалить чат', iconStart: '@tui.trash' },
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
  }
}
