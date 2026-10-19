import { Component, inject } from '@angular/core';
import { TuiTextfieldComponent, TuiInputDirective, TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiBadge, TuiTextareaComponent } from '@taiga-ui/kit';
import { MessageInputAttachButton } from '../message-input-attach-button/message-input-attach-button';
import { OpenedChatService } from '../../../services/opened-chat.service';

@Component({
  selector: 'app-message-input',
  imports: [
    TuiTextfieldComponent,
    TuiInputDirective,
    TuiButton,
    TuiTextareaComponent,
    MessageInputAttachButton,
  ],
  templateUrl: './message-input.html',
  styleUrl: './message-input.less',
})
export class MessageInput {
  private readonly openedChatService = inject(OpenedChatService);
}
