import { ChangeDetectionStrategy, Component, model, signal } from '@angular/core';
import {
  TuiAppearance,
  TuiButton,
  TuiDataList,
  TuiDropdown,
  TuiDropdownPosition,
  TuiOptGroup,
  TuiOption,
} from '@taiga-ui/core';
import { TuiActiveZone, TuiObscured } from '@taiga-ui/cdk';
import { TuiChevron } from '@taiga-ui/kit';

interface MessageAction {
  readonly title: string;
  readonly iconStart: string;
  readonly action?: () => void;
}

@Component({
  selector: 'app-message-actions-button',
  imports: [
    TuiButton,
    TuiDataList,
    TuiDropdown,
    TuiChevron,
    TuiActiveZone,
    TuiObscured,
    TuiOptGroup,
    TuiOption,
    TuiAppearance,
    TuiDropdownPosition,
  ],
  templateUrl: './message-actions-button.html',
  styleUrl: './message-actions-button.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageActionsButton {
  readonly open = model<boolean>(false);

  protected readonly actions: readonly MessageAction[] = [
    {
      title: 'Данные о сообщении',
      iconStart: '@tui.info',
    },
    {
      title: 'Ответить',
      iconStart: '@tui.reply',
    },
    {
      title: 'Копировать',
      iconStart: '@tui.copy',
    },
    {
      title: 'Отреагировать',
      iconStart: '@tui.smile',
    },
    {
      title: 'Скачать',
      iconStart: '@tui.download',
    },
    {
      title: 'Переслать',
      iconStart: '@tui.forward',
    },
    {
      title: 'Закрепить',
      iconStart: '@tui.pin',
    },
    {
      title: 'В избранное',
      iconStart: '@tui.star',
    },
  ];

  protected readonly selected = signal<MessageAction | null>(null);

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

  protected onSelect(action: MessageAction): void {
    this.selected.set(action);
    this.open.set(false);
  }
}
