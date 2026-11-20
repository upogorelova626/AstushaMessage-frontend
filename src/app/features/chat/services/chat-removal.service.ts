import type { Type } from '@angular/core';
import { computed, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { catchError, EMPTY, tap } from 'rxjs';

import { OpenedChatService } from './opened-chat.service';
import { ChatsStoreService } from '../../chats/services/chats-store.service';
import { ChatManagementService } from '../../../shared/services/chat-management.service';
import { ClearChatConfirmationDialog } from '../../../shared/components/clear-chat-confirmation-dialog/clear-chat-confirmation-dialog';
import { DeleteChatConfirmationDialog } from '../../../shared/components/delete-chat-confirmation-dialog/delete-chat-confirmation-dialog';
import { NotificationService } from '../../../shared/services/notification.service';

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
  private readonly notificationService = inject(NotificationService);

  private readonly dialogs = inject(TuiDialogService);
  private readonly router = inject(Router);

  private readonly chatId = computed(() => this.openedChatService.chat()?.id);

  cleanChat(params: CleanOrDeleteChatParametrs): void {
    this.openDialog(ClearChatConfirmationDialog, params, false);
  }

  deleteChat(params: CleanOrDeleteChatParametrs): void {
    this.openDialog(DeleteChatConfirmationDialog, params, true);
  }

  private openDialog(
    component: Type<unknown>,
    params: CleanOrDeleteChatParametrs,
    isDeleting: boolean,
  ): void {
    const chatId = params.chatIsOpen ? this.chatId() : params.chatId;

    const chatTitle = params.chatIsOpen ? this.openedChatService.chatTitle() : params.chatTitle;

    if (!chatId) {
      return;
    }

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

        const request$ = isDeleting
          ? this.chatManagementService.deleteChat(chatId)
          : this.chatManagementService.clearChat(chatId);

        request$
          .pipe(
            tap(() => {
              this.notificationService.openPositiveAlert(isDeleting ? 'Чат удалён' : 'Чат очищен');
            }),
            catchError(() => {
              this.notificationService.openNegativeAlert(
                isDeleting ? 'Не удалось удалить чат' : 'Не удалось очистить чат',
              );

              return EMPTY;
            }),
          )
          .subscribe(() => {
            this.chatsStoreService.loadChatsAndFolders();

            if (isDeleting && this.chatId() === chatId) {
              this.openedChatService.clearChat();
              void this.router.navigate(['/chats']);
            }
          });
      });
  }
}
