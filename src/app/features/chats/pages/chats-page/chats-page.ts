import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { ChatList } from '../../components/chat-list/chat-list';

@Component({
  selector: 'app-chats-page',
  imports: [Sidebar, ChatList],
  templateUrl: './chats-page.html',
  styleUrl: './chats-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsPage {}
