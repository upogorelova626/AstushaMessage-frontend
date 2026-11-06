import { computed, inject, Injectable, signal } from '@angular/core';
import { TuiNotificationService } from '@taiga-ui/core';
import { catchError, EMPTY, finalize } from 'rxjs';
import { MessageService } from '../../../shared/services/message.service';
import type { Message, MessagesList } from '../../../shared/interfaces';
import { MessagesSocketService } from '../../../shared/services/messages-socket.service';

@Injectable({
  providedIn: 'root',
})
export class MessagesStoreService {
  private readonly messageService = inject(MessageService);
  private readonly messagesSocketService = inject(MessagesSocketService);

  private readonly alert = inject(TuiNotificationService);

  private requestVersion = 0;

  public readonly messages = signal<MessagesList | null>(null);
  public readonly isLoading = signal(false);
  public activeChatId = signal<string | null>(null);

  public noMoreMessages = computed(() => {
    const messagesResponce = this.messages()?.hasMore;

    return !messagesResponce;
  });

  constructor() {
    this.messagesSocketService.newMessage$.subscribe((message) => {
      this.updateMessages(message);
    });
  }

  getMessages(): void {
    const chatId = this.activeChatId();
    const version = ++this.requestVersion;

    if (!chatId) {
      return;
    }

    this.messages.set(null);
    this.isLoading.set(true);

    this.messageService
      .getAllMessages(chatId, null)
      .pipe(
        catchError(() => {
          if (this.isCurrentRequest(chatId, version)) {
            this.showError();
          }

          return EMPTY;
        }),
        finalize(() => {
          if (this.isCurrentRequest(chatId, version)) {
            this.isLoading.set(false);
          }
        }),
      )
      .subscribe((response) => {
        if (!this.isCurrentRequest(chatId, version)) {
          return;
        }

        this.messages.set(response);
      });
  }

  addMessages(): void {
    const chatId = this.activeChatId();
    const state = this.messages();

    if (this.isLoading() || !state || !state.hasMore || !state.nextCursor || !chatId) {
      return;
    }

    const version = this.requestVersion;
    const cursor = state.nextCursor;

    this.isLoading.set(true);

    this.messageService
      .getAllMessages(chatId, cursor)
      .pipe(
        catchError(() => {
          if (this.isCurrentRequest(chatId, version)) {
            this.showError();
          }

          return EMPTY;
        }),
        finalize(() => {
          if (this.isCurrentRequest(chatId, version)) {
            this.isLoading.set(false);
          }
        }),
      )
      .subscribe((response) => {
        if (!this.isCurrentRequest(chatId, version)) {
          return;
        }

        this.messages.update((current) => {
          if (!current || current.nextCursor !== cursor) {
            return current;
          }

          return {
            items: [...response.items, ...current.items],
            hasMore: response.hasMore,
            nextCursor: response.nextCursor,
          };
        });
      });
  }

  cleanMessages(): void {
    ++this.requestVersion;
    this.activeChatId.set(null);

    this.messages.set(null);
    this.isLoading.set(false);
  }

  private updateMessages(message: Message): void {
    if (this.activeChatId() !== message.chatId) {
      return;
    }

    this.messages.update((current) => {
      if (!current) {
        return null;
      }

      if (current.items.some((item) => item.id === message.id)) {
        return current;
      }

      return {
        ...current,
        items: [...current.items, message],
      };
    });
  }

  private isCurrentRequest(chatId: string, version: number): boolean {
    return this.activeChatId() === chatId && this.requestVersion === version;
  }

  private showError(): void {
    this.alert
      .open('Не удалось загрузить сообщения', {
        appearance: 'negative',
        label: 'Ошибка',
      })
      .subscribe();
  }
}
