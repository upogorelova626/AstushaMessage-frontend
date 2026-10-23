import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButton, type TuiDialogContext } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { TuiSwitch } from '@taiga-ui/kit';

interface ClearChatDialogData {
  chatId: string;
  chatTitle: string;
}

@Component({
  selector: 'app-clear-chat-confirmation-dialog',
  imports: [TuiButton, TuiSwitch],
  templateUrl: './clear-chat-confirmation-dialog.html',
  styleUrl: './clear-chat-confirmation-dialog.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClearChatConfirmationDialog {
  protected readonly context = injectContext<TuiDialogContext<boolean, ClearChatDialogData>>();

  protected readonly chatTitle = this.context.data.chatTitle;

  protected cleanChat(): void {
    this.context.completeWith(true);
  }

  protected cancel(): void {
    this.context.completeWith(false);
  }
}
