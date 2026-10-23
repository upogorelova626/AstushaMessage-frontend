import { computed, inject, Injectable, Type } from '@angular/core';
import { TuiDialogService, TuiNotificationService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { catchError, EMPTY, tap } from 'rxjs';

import { OpenedChatService } from './opened-chat.service';
import { ChatsStoreService } from '../../chats/services/chats-store.service';
import { ChatManagementService } from '../../../shared/services/chat-management.service';
import { ClearChatConfirmationDialog } from '../../../shared/components/clear-chat-confirmation-dialog/clear-chat-confirmation-dialog';

export interface CleanOrDeleteChatParametrs {
  chatIsOpen: boolean;
  chatId?: string;
  chatTitle?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ChatRemovalService {
  private readonly openedChatService = inject(OpenedChatService);
  private readonly chatsStoreService = inject(ChatsStoreService);
  private readonly chatManagementService = inject(ChatManagementService);

  private readonly dialogs = inject(TuiDialogService);
  private readonly alerts = inject(TuiNotificationService);

  private readonly chatId = computed(() => this.openedChatService.chat()?.id);

  cleanChat(params: CleanOrDeleteChatParametrs): void {
    this.openDialog(ClearChatConfirmationDialog, params);
  }

  deleteChat() {}

  private openDialog(component: Type<unknown>, params: CleanOrDeleteChatParametrs): void {
    const chatId = params.chatIsOpen ? this.chatId() : params.chatId;

    if (!chatId) {
      return;
    }

    const chatTitle = params.chatIsOpen ? this.openedChatService.chatTitle() : params.chatTitle;

    this.dialogs
      .open<boolean>(new PolymorpheusComponent(component), {
        size: 's',
        closable: false,
        data: {
          chatId,
          chatTitle: chatTitle ?? '',
        },
      })
      .subscribe((confirmed) => {
        if (!confirmed) {
          return;
        }

        this.chatManagementService
          .clearChat(chatId)
          .pipe(
            tap(() => {
              this.openPositiveAlert('Чат очищен');
            }),
            catchError(() => {
              this.openNegativeAlert('Не удалось очистить чат');

              return EMPTY;
            }),
          )
          .subscribe(() => {
            this.chatsStoreService.getAllChats();
          });
      });
  }

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
