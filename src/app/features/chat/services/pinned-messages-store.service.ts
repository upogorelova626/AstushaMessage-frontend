import { inject, Injectable, signal } from '@angular/core';
import type { PinnedMessage } from '../../../shared/interfaces';
import { MessageService } from '../../../shared/services/message.service';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { TuiNotificationService } from '@taiga-ui/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class PinnedMessagesStoreService {
  private readonly alerts = inject(TuiNotificationService);
  private readonly messageService = inject(MessageService);

  readonly pinnedMessages = signal<PinnedMessage[]>([]);
  readonly isPinnedMessagesLoading = signal(false);
  readonly activeChatId = signal<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private readonly activeChatId$ = toObservable(this.activeChatId);

  constructor() {
    this.activeChatId$
      .pipe(
        switchMap((chatId) => {
          this.pinnedMessages.set([]);

          if (!chatId) {
            return of([]);
          }

          this.isPinnedMessagesLoading.set(true);

          return this.messageService.getPinnedMessages(chatId).pipe(
            catchError(() => {
              this.alerts
                .open('Не удалось загрузить закрепленные сообщения', {
                  label: 'Ошибка',
                  appearance: 'negative',
                })
                .subscribe();

              return of([]);
            }),
            finalize(() => this.isPinnedMessagesLoading.set(false)),
          );
        }),
      )
      .subscribe((messages) => this.pinnedMessages.set(messages));
  }

  refreshPinnedMessages(): void {
    const chatId = this.activeChatId();

    if (!chatId) {
      return;
    }

    this.isPinnedMessagesLoading.set(true);

    this.messageService
      .getPinnedMessages(chatId)
      .pipe(
        catchError(() => {
          this.alerts
            .open('Не удалось загрузить закрепленные сообщения', {
              label: 'Ошибка',
              appearance: 'negative',
            })
            .subscribe();

          return of([]);
        }),
        finalize(() => this.isPinnedMessagesLoading.set(false)),
      )
      .subscribe((messages) => this.pinnedMessages.set(messages));
  }

  cleanPinnedMessages(): void {
    this.activeChatId.set(null);
    this.pinnedMessages.set([]);
  }
}
