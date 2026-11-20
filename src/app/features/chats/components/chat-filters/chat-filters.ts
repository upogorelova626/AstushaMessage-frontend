import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiButton, TuiAppearance } from '@taiga-ui/core';
import { ChatFolderMenuButton } from '../chat-folder-menu-button/chat-folder-menu-button';
import { ChatsStoreService } from '../../services/chats-store.service';

@Component({
  selector: 'app-chat-filters',
  imports: [TuiButton, ChatFolderMenuButton, TuiAppearance],
  templateUrl: './chat-filters.html',
  styleUrl: './chat-filters.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatFilters {
  private readonly chatsStoreService = inject(ChatsStoreService);

  protected readonly chatLists = this.chatsStoreService.chatLists;

  protected readonly chatFilter = this.chatsStoreService.chatsFilter;

  protected changeFilterValue(filterValue: string): void {
    this.chatsStoreService.chatsFilter.set(filterValue);
  }
}
