import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import type { OnInit } from '@angular/core';
import { MessageInfoPageHeader } from '../../components/message-info-components/message-info-page-header/message-info-page-header';
import { MessageInfoView } from '../../components/message-info-components/message-info-view/message-info-view';
import { MessageInfoData } from '../../components/message-info-components/message-info-data/message-info-data';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../../shared/services/message.service';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import type { BarContext } from '../../../../shared/drawer/base-bar.service';
import { catchError, EMPTY, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TuiNotificationService } from '@taiga-ui/core';
import type { Message } from '../../../../shared/interfaces';
import { TuiSkeleton } from '@taiga-ui/kit';

@Component({
  selector: 'app-message-info',
  imports: [MessageInfoPageHeader, MessageInfoView, MessageInfoData, TuiSkeleton],
  templateUrl: './message-info.html',
  styleUrl: './message-info.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInfo implements OnInit {
  private readonly messageService = inject(MessageService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly alerts = inject(TuiNotificationService);

  readonly message = signal<Message | null>(null);
  readonly isLoading = signal(false);

  readonly context = inject(POLYMORPHEUS_CONTEXT, {
    optional: true,
  }) as BarContext<{ chatId: string; messageId: string }, null> | null;

  ngOnInit(): void {
    const chatId = this.context?.chatId ?? this.route.snapshot.paramMap.get('chatId');

    const messageId = this.context?.messageId ?? this.route.snapshot.paramMap.get('messageId');

    if (!chatId || !messageId) {
      return;
    }

    this.isLoading.set(true);

    this.messageService
      .getMessage(chatId, messageId)
      .pipe(
        catchError(() => {
          this.alerts
            .open('Не удалось загрузить сообщение', { label: 'Ошибка', appearance: 'negative' })
            .subscribe();
          return EMPTY;
        }),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((message) => this.message.set(message));
  }
}
