import { Injectable, signal } from '@angular/core';
import type { Message } from '../../../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FoundedMessagesInChatService {
  readonly messages = signal<Message[]>([]);

  readonly isSearching = signal<boolean>(false);
  readonly isLoading = signal<boolean>(false);

  cleanFoundedMessages(): void {
    this.messages.set([]);
  }
}
