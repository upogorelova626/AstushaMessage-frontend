import { inject, Injectable, signal } from '@angular/core';
import { TuiNotificationService } from '@taiga-ui/core';
import { catchError, EMPTY, finalize } from 'rxjs';

import { MessageService } from '../../../shared/services/message.service';
import { MessagesList } from '../../../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MessagesStoreService {
  private readonly messageService = inject(MessageService);
  private readonly alert = inject(TuiNotificationService);

  private requestVersion = 0;

  public activeChatId = signal<string | null>(null);
  public readonly messages = signal<MessagesList | null>(null);
  public readonly isLoading = signal(false);

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

    if (
      this.isLoading() ||
      this.activeChatId() !== chatId ||
      !state ||
      !state.hasMore ||
      !state.nextCursor ||
      !chatId
    ) {
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
            items: [...current.items, ...response.items],
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
