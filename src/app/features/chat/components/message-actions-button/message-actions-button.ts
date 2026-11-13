import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
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
import { ActionsWithMessageService } from '../../services/actions-with-message.service';
import type { Message } from '../../../../shared/interfaces';

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
  private readonly actionsWithMessageService = inject(ActionsWithMessageService);

  readonly open = model<boolean>(false);
  readonly message = input.required<Message>();

  protected readonly actions = computed<readonly MessageAction[]>(() => [
    {
      title: 'Данные о сообщении',
      iconStart: '@tui.info',
      action: () => {
        this.actionsWithMessageService.openMessageData(this.message());
      },
    },
    {
      title: 'Ответить',
      iconStart: '@tui.reply',
    },
    {
      title: 'Копировать',
      iconStart: '@tui.copy',
      action: () => {
        this.actionsWithMessageService.copy(this.message().text);
      },
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
      title: this.message().isPinned ? 'Открепить' : 'Закрепить',
      iconStart: '@tui.pin',
      action: this.message().isPinned
        ? () => {
            this.actionsWithMessageService.unpinMessage(this.message().id);
          }
        : () => {
            this.actionsWithMessageService.pin(this.message().id);
          },
    },
    {
      title: 'В избранное',
      iconStart: '@tui.star',
    },
  ]);

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
    action.action?.();
    this.open.set(false);
  }
}
