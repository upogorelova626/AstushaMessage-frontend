import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { ChatList } from '../../components/chat-list/chat-list';
import { ChatEmptyState } from '../../components/chat-empty-state/chat-empty-state';
import { SideBarService } from '../../../../shared/sidebar.service';

@Component({
  selector: 'app-chats-page',
  imports: [Sidebar, ChatList, ChatEmptyState],
  templateUrl: './chats-page.html',
  styleUrl: './chats-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SideBarService],
})
export class ChatsPage {}
