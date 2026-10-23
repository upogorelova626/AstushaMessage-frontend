import { computed, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { TuiNotificationService } from '@taiga-ui/core';

import { OpenedChatService } from './opened-chat.service';
import { ChatSettingsService } from '../../../shared/services/chat-settings.service';
import { ChatsStoreService } from '../../chats/services/chats-store.service';

interface EditChatFavoriteParametrs {
  chatIsOpen: boolean;
  chatId?: string;
  isFavorite: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ActionsWithChatService {
  private readonly openedChatService = inject(OpenedChatService);
  private readonly chatSettingsService = inject(ChatSettingsService);
  private readonly chatsStoreService = inject(ChatsStoreService);

  private readonly alerts = inject(TuiNotificationService);
  private readonly router = inject(Router);

  private readonly chatId = computed(() => this.openedChatService.chat()?.id);

  archiveChat(chatId: string, value: boolean) {
    const payload = { isArchived: value };

    this.chatSettingsService
      .archiveChat(chatId, payload)
      .pipe(
        tap(() => {
          const text = value ? 'Чат архивирован' : 'Чат разархивирован';
          this.openPositiveAlert(text);
        }),
        catchError(() => {
          const text = value ? 'Не удалось архивировать чат' : 'Не удалось разархивировать чат';

          this.openNegativeAlert(text);

          return EMPTY;
        }),
      )
      .subscribe((chat) => {
        this.chatsStoreService.getAllChats();

        if (this.chatId() === chat.id) {
          this.openedChatService.setChat(chat);
        }
      });
  }

  block() {}

  changeFavorite(parametrs: EditChatFavoriteParametrs) {
    const chatId = parametrs.chatIsOpen ? this.chatId() : parametrs.chatId;

    if (!chatId) {
      return;
    }

    const payload = { isFavorite: parametrs.isFavorite };

    this.chatSettingsService
      .favoriteChat(chatId, payload)
      .pipe(
        tap(() => {
          const text = parametrs.isFavorite
            ? 'Добавлено в список избранного'
            : 'Удалено из списка избранного';

          this.openPositiveAlert(text);
        }),
        catchError(() => {
          const text = parametrs.isFavorite
            ? 'Не удалось добавить чат в избранное'
            : 'Не удалось удалить чат из избранного';

          this.openNegativeAlert(text);

          return EMPTY;
        }),
      )
      .subscribe((chat) => {
        this.chatsStoreService.getAllChats();

        if (this.chatId() === chat.id) {
          this.openedChatService.setChat(chat);
        }
      });
  }

  changeList() {}

  closeChat() {
    this.router.navigate(['/chats']);
  }

  complain() {}

  exportChat() {}

  openChatThemesPage() {}

  openContactDetailsPage() {}

  openSearchMessageInChatPage() {
    const id = this.chatId();

    if (id) {
      this.router.navigate(['/chats', id, 'search']);
    }
  }

  pinChat(chatId: string, isPinned: boolean): void {
    const payload = { isPinned };

    this.chatSettingsService
      .pinChat(chatId, payload)
      .pipe(
        tap(() => {
          const text = isPinned ? 'Чат закреплён' : 'Чат откреплён';
          this.openPositiveAlert(text);
        }),
        catchError(() => {
          const text = isPinned ? 'Не удалось закрепить чат' : 'Не удалось открепить чат';

          this.openNegativeAlert(text);

          return EMPTY;
        }),
      )
      .subscribe((chat) => {
        this.chatsStoreService.getAllChats();

        if (this.chatId() === chat.id) {
          this.openedChatService.setChat(chat);
        }
      });
  }

  selectChatMessages() {}

  sendCallLink() {}

  startNewGroupCall() {}

  turnOffDisappearingMessages() {}

  turnOffSound() {}

  private openPositiveAlert(text: string): void {
    this.alerts
      .open(text, {
        appearance: 'positive',
        block: 'end',
        inline: 'start',
      })
      .subscribe();
  }

  private openNegativeAlert(text: string): void {
    this.alerts
      .open(text, {
        appearance: 'negative',
        block: 'end',
        inline: 'start',
      })
      .subscribe();
  }
}
