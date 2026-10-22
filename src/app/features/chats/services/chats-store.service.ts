import { inject, Injectable, signal } from '@angular/core';
import { Chat } from '../../../shared/interfaces';
import { finalize } from 'rxjs';
import { ChatService } from '../../../shared/services/chat.service';

@Injectable({
  providedIn: 'root',
})
export class ChatsStoreService {
  private readonly chatService = inject(ChatService);

  readonly chats = signal<Chat[]>([]);
  readonly isLoading = signal<boolean>(false);

  public getAllChats() {
    this.chatService
      .getAllChats()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((chats) => {
        this.chats.set(chats);
      });
  }
}
