import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatHeader } from '../../components/chat-header/chat-header';

@Component({
  selector: 'app-chat-page',
  imports: [ChatHeader],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPage {}
