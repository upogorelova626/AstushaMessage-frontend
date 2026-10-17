import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ChatList } from '../../components/chat-list/chat-list';
import { SideBarService } from '../../../../shared/drawer/sidebar.service';
import { SidebarHost } from '../../../../shared/drawer/sidebar-host';
import { RouterOutlet } from '@angular/router';
import { ChatService } from '../../../../shared/services/chat.service';
import { ChatsStoreService } from '../../services/chats-store.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-chats-page',
  imports: [ChatList, SidebarHost, RouterOutlet],
  templateUrl: './chats-page.html',
  styleUrl: './chats-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SideBarService],
})
export class ChatsPage implements OnInit {
  private readonly chatsService = inject(ChatService);
  private readonly chatsStoreService = inject(ChatsStoreService);

  protected readonly isLoading = signal<boolean>(false);

  ngOnInit() {
    this.isLoading.set(true);

    this.chatsService
      .getAllChats()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((chats) => {
        this.chatsStoreService.chats.set(chats);
      });
  }
}
