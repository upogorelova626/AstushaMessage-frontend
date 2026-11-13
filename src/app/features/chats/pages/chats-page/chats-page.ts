import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChatList } from '../../components/chat-list/chat-list';
import { SideBarService } from '../../../../shared/drawer/sidebar.service';
import { SidebarHost } from '../../../../shared/drawer/sidebar-host';
import { RouterOutlet } from '@angular/router';
import { ChatsStoreService } from '../../services/chats-store.service';
import { ActionsWithMessageService } from '../../../chat/services/actions-with-message.service';

@Component({
  selector: 'app-chats-page',
  imports: [ChatList, SidebarHost, RouterOutlet],
  templateUrl: './chats-page.html',
  styleUrl: './chats-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SideBarService, ActionsWithMessageService],
})
export class ChatsPage implements OnInit {
  private readonly chatsStoreService = inject(ChatsStoreService);

  ngOnInit(): void {
    this.chatsStoreService.getAllChats();
  }
}
