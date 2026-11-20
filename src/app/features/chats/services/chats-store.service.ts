import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, finalize, forkJoin } from 'rxjs';

import type { Chat, ChatFolder } from '../../../shared/interfaces';
import { ChatService } from '../../../shared/services/chat.service';
import { ChatFolderService } from '../../../shared/services/chat-folder.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ChatsStoreService {
  private readonly chatService = inject(ChatService);
  private readonly chatFolderService = inject(ChatFolderService);
  private readonly notificationService = inject(NotificationService);

  readonly chats = signal<Chat[]>([]);
  readonly chatLists = signal<ChatFolder[]>([]);

  readonly chatsFilter = signal<string>('all');
  readonly isLoading = signal<boolean>(false);

  readonly filteredChats = computed(() => {
    const chats = this.chats();
    const filterValue = this.chatsFilter();

    if (filterValue === 'all') {
      return chats;
    }

    if (filterValue === 'favourites') {
      return chats.filter((chat) => chat.settings.isFavorite);
    }

    const list = this.chatLists().find((list) => list.id === filterValue);

    if (!list) {
      return [];
    }

    const chatIds = new Set(list.items.map((item) => item.chatId));

    return chats.filter((chat) => chatIds.has(chat.id));
  });

  loadChatsAndFolders(): void {
    this.isLoading.set(true);

    forkJoin({
      chats: this.chatService.getAllChats(),
      lists: this.chatFolderService.getAllFolders(),
    })
      .pipe(
        catchError(() => {
          this.notificationService.openNegativeAlert('Не удалось загрузить информацию о чатах');
          return EMPTY;
        }),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe(({ chats, lists }) => {
        this.chats.set(chats);
        this.chatLists.set(lists);
      });
  }
}
