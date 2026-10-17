import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatHeader } from '../../components/chat-header/chat-header';
import { ChatMessages } from '../../components/chat-messages/chat-messages';

@Component({
  selector: 'app-chat-page',
  imports: [ChatHeader, ChatMessages],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPage {}
