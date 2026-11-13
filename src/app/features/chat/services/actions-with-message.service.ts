import { DestroyRef, inject, Injectable, Injector, signal } from '@angular/core';
import { Router } from '@angular/router';
import { OpenedChatService } from './opened-chat.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SideBarService } from '../../../shared/drawer/sidebar.service';
import { MessageInfo } from '../pages/message-info/message-info';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import type { Message, PinMessageDuration } from '../../../shared/interfaces';
import { MessageActionsService } from '../../../shared/services/message-actions.service';
import { TuiDialogService } from '@taiga-ui/core';
import { MessagesStoreService } from './messages-store.service';
import { PinMessageDialog } from '../components/dialogs/pin-message-dialog/pin-message-dialog';
import { filter, finalize, switchMap, tap } from 'rxjs';

@Injectable()
export class ActionsWithMessageService {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly sidebarService = inject(SideBarService);
  private readonly dialogs = inject(TuiDialogService);

  private readonly openedChatService = inject(OpenedChatService);
  private readonly messageActionsService = inject(MessageActionsService);
  private readonly messagesStoreService = inject(MessagesStoreService);

  private readonly router = inject(Router);
  private readonly clipboard = inject(Clipboard);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);

  private readonly isSmallScreen = signal(false);
  readonly isLoading = signal(false);

  constructor() {
    this.breakpointObserver
      .observe('(max-width: 1300px)')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ matches }) => {
        this.isSmallScreen.set(matches);
      });
  }

  answer(): void {
    return;
  }

  changeFavoriteStatus(): void {
    return;
  }

  complain(): void {
    return;
  }

  copy(text: string): void {
    this.clipboard.copy(text);
  }

  deleteMessage(): void {
    return;
  }

  download(): void {
    return;
  }

  forward(): void {
    return;
  }

  openMessageData(message: Message): void {
    const messageId = message.id;

    if (this.isSmallScreen()) {
      void this.router.navigate([
        '/chats',
        this.openedChatService.chat()?.id,
        'message',
        messageId,
      ]);
    } else {
      this.openMessageInfo(messageId);
    }
  }

  save(): void {
    return;
  }

  pin(messageId: string): void {
    const chatId = this.openedChatService.chat()?.id;

    if (!chatId || this.isLoading()) {
      return;
    }

    this.dialogs
      .open<PinMessageDuration | false>(new PolymorpheusComponent(PinMessageDialog), { size: 's' })
      .pipe(
        filter((duration): duration is PinMessageDuration => duration !== false),

        switchMap((duration) => {
          this.isLoading.set(true);

          return this.messageActionsService
            .pinMessage(chatId, messageId, { duration: duration })
            .pipe(finalize(() => this.isLoading.set(false)));
        }),

        tap((message) => {
          this.messagesStoreService.updateMessage(message);
        }),
      )
      .subscribe();
  }

  react(): void {
    return;
  }

  unpinMessage(messageId: string): void {
    const chatId = this.openedChatService.chat()?.id;

    if (!chatId) {
      return;
    }

    this.isLoading.set(true);

    this.messageActionsService
      .unpinMessage(chatId, messageId)
      .pipe()
      .subscribe((message) => {
        this.messagesStoreService.updateMessage(message);
        this.isLoading.set(false);
      });
  }

  private openMessageInfo(messageId: string): void {
    const chatId = this.openedChatService.chat()?.id;

    if (!chatId) {
      return;
    }

    this.sidebarService
      .open$<MessageInfo, null>(
        new PolymorpheusComponent(MessageInfo, this.injector),
        {
          overlay: false,
          rounded: false,
          offset: false,
          closeOnClickOutside: true,
        },
        { chatId, messageId },
      )
      .subscribe();
  }
}
