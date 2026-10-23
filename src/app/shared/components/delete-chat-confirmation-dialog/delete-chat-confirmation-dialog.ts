import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButton, type TuiDialogContext } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';

interface DeleleChatDialogData {
  chatId: string;
  chatTitle: string;
}

@Component({
  selector: 'app-delete-chat-confirmation-dialog',
  imports: [TuiButton],
  templateUrl: './delete-chat-confirmation-dialog.html',
  styleUrl: './delete-chat-confirmation-dialog.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteChatConfirmationDialog {
  protected readonly context = injectContext<TuiDialogContext<boolean, DeleleChatDialogData>>();

  protected readonly chatTitle = this.context.data.chatTitle;

  protected deleteChat(): void {
    this.context.completeWith(true);
  }

  protected cancel(): void {
    this.context.completeWith(false);
  }
}
