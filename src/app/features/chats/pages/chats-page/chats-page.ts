import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { ChatList } from '../../components/chat-list/chat-list';
import { ChatEmptyState } from '../../components/chat-empty-state/chat-empty-state';
import { SideBarService } from '../../../../shared/drawer/sidebar.service';
import { SidebarHost } from '../../../../shared/drawer/sidebar-host';
import { CurrentUserService } from '../../../../shared/services/current-user.service';

@Component({
  selector: 'app-chats-page',
  imports: [Sidebar, ChatList, ChatEmptyState, SidebarHost],
  templateUrl: './chats-page.html',
  styleUrl: './chats-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SideBarService],
})
export class ChatsPage implements OnInit {
  private readonly currentUserService = inject(CurrentUserService);

  ngOnInit() {
    this.currentUserService.getMe().subscribe();
  }
}
