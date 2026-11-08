import { Injectable, signal } from '@angular/core';
import type { MessagesList } from '../../../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FoundedMessagesInChatService {
  readonly messagesList = signal<MessagesList | null>(null);

  readonly isSearching = signal<boolean>(false);
  readonly isLoading = signal<boolean>(false);

  cleanFoundedMessages(): void {
    this.messagesList.set(null);
  }
}
