import { Injectable, signal } from '@angular/core';
import { Chat } from '../../../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ChatsStoreService {
  readonly chats = signal<Chat[]>([]);
}
