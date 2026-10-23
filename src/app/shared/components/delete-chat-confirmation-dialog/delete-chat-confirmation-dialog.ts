import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-delete-chat-confirmation-dialog',
  imports: [],
  templateUrl: './delete-chat-confirmation-dialog.html',
  styleUrl: './delete-chat-confirmation-dialog.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteChatConfirmationDialog {}
