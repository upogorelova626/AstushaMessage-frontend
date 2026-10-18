import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';
import { TuiMessage } from '@taiga-ui/kit';

export interface ChatMessage {
  id: string;
  text: string;
  createdAt: string;
  isMine: boolean;
  isRead: boolean;
}

@Component({
  selector: 'app-message',
  imports: [TuiMessage, TuiIcon, DatePipe],
  templateUrl: './message.html',
  styleUrl: './message.less',
})
export class Message {
  readonly message = input.required<ChatMessage>();
}
