import { DestroyRef, inject, Injectable, Injector, signal } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { OpenedChatService } from './opened-chat.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SideBarService } from '../../../shared/drawer/sidebar.service';
import { MessageInfo } from '../pages/message-info/message-info';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import type { Message } from '../../../shared/interfaces';

@Injectable()
export class ActionsWithMessageService {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly openedChatService = inject(OpenedChatService);
  private readonly sidebarService = inject(SideBarService);

  private readonly router = inject(Router);
  private readonly clipboard = inject(Clipboard);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);

  private readonly isSmallScreen = signal(false);

  constructor() {
    this.breakpointObserver
      .observe('(max-width: 1300px)')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ matches }) => {
        this.isSmallScreen.set(matches);
      });
  }

  answer() {
    return EMPTY;
  }

  changeFavoriteStatus() {
    return EMPTY;
  }

  complain() {
    return EMPTY;
  }

  copy(text: string): void {
    this.clipboard.copy(text);
  }

  deleteMessage() {
    return EMPTY;
  }

  download() {
    return EMPTY;
  }

  forward() {
    return EMPTY;
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

  save() {
    return EMPTY;
  }

  pin() {
    return EMPTY;
  }

  react() {
    return EMPTY;
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
