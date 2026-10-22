import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChatSearch } from '../chat-search/chat-search';
import { ChatFilters } from '../chat-filters/chat-filters';
import { Header } from '../header/header';
import { ClosedChats } from '../closed-chats/closed-chats';
import { ArchivedChats } from '../archived-chats/archived-chats';
import { ChatsStoreService } from '../../services/chats-store.service';
import { ChatItem } from '../chat-item/chat-item';
import { TuiSkeleton } from '@taiga-ui/kit';

@Component({
  selector: 'app-chat-list',
  imports: [ChatSearch, ChatFilters, Header, ClosedChats, ArchivedChats, ChatItem, TuiSkeleton],
  templateUrl: './chat-list.html',
  styleUrl: './chat-list.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatList {
  private readonly chatsStoreService = inject(ChatsStoreService);

  protected readonly chats = this.chatsStoreService.chats;
  protected readonly isLoading = this.chatsStoreService.isLoading;
}
