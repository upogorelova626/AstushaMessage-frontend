import { ChangeDetectionStrategy, Component, inject, input, model, signal } from '@angular/core';
import { TuiActiveZone, TuiObscured } from '@taiga-ui/cdk';
import { TuiAppearance, TuiButton, TuiDataList, TuiDropdown, TuiOption } from '@taiga-ui/core';

import { ActionsWithMessageService } from '../../../services/actions-with-message.service';
import type { Message } from '../../../../../shared/interfaces';

interface PinnedMessagesAction {
  readonly title: string;
  readonly iconStart: string;
  readonly action?: () => void;
}

@Component({
  selector: 'app-actions-with-pinned-messages-button',
  imports: [
    TuiButton,
    TuiDataList,
    TuiDropdown,
    TuiActiveZone,
    TuiObscured,
    TuiOption,
    TuiAppearance,
  ],
  templateUrl: './actions-with-pinned-messages-button.html',
  styleUrl: './actions-with-pinned-messages-button.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsWithPinnedMessagesButton {
  private readonly actionsWithMessageService = inject(ActionsWithMessageService);

  readonly open = model<boolean>(false);
  readonly message = input<Message>();

  protected readonly actions: readonly PinnedMessagesAction[] = [
    {
      title: 'Открепить',
      iconStart: '@tui.pin-off',
      action: () => {
        const messageId = this.message()?.id;

        if (!messageId) {
          return;
        }

        this.actionsWithMessageService.unpinMessage(messageId);
      },
    },
    {
      title: 'Перейти к сообщению',
      iconStart: '@tui.arrow-right',
      action: () => {
        return;
      },
    },
  ];

  protected readonly selected = signal<PinnedMessagesAction | null>(null);

  protected onClick(event: Event): void {
    event.stopPropagation();
    this.open.set(true);
  }

  protected onObscured(obscured: boolean): void {
    if (obscured) {
      this.open.set(false);
    }
  }

  protected onSelect(action: PinnedMessagesAction): void {
    this.selected.set(action);
    action.action?.();
    this.open.set(false);
  }

  protected onActiveZone(active: boolean): void {
    if (!active) {
      this.open.set(false);
    }
  }
}
