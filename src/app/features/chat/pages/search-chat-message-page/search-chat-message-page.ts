import type { OnInit, OnDestroy } from '@angular/core';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { SearchHeader } from '../../components/search-chat-message-components/search-header/search-header';
import { SearchInput } from '../../components/search-chat-message-components/search-input/search-input';
import { SearchResults } from '../../components/search-chat-message-components/search-results/search-results';
import { OpenedChatService } from '../../services/opened-chat.service';
import { ActivatedRoute } from '@angular/router';
import { TuiNotificationService, TuiScrollbar } from '@taiga-ui/core';
import { ChatService } from '../../../../shared/services/chat.service';
import { catchError, EMPTY, finalize } from 'rxjs';
import { TuiSkeleton } from '@taiga-ui/kit';
import { FoundedMessagesInChatService } from '../../services/founded-messages-in-chat.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-chat-message-page',
  imports: [SearchHeader, SearchInput, SearchResults, TuiSkeleton, TuiScrollbar],
  templateUrl: './search-chat-message-page.html',
  styleUrl: './search-chat-message-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchChatMessagePage implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly alerts = inject(TuiNotificationService);

  private readonly chatService = inject(ChatService);
  private readonly openedChatService = inject(OpenedChatService);
  private readonly foundedMessagesInChatService = inject(FoundedMessagesInChatService);

  private readonly destroyRef = inject(DestroyRef);

  protected readonly isChatLoading = signal<boolean>(false);

  ngOnInit(): void {
    const chatId = this.route.snapshot.paramMap.get('chatId');

    if (!chatId) {
      return;
    }

    this.isChatLoading.set(true);

    this.chatService
      .getChat(chatId)
      .pipe(
        catchError(() => {
          this.alerts
            .open('Не удалось открыть страницу поиска сообщений', {
              label: 'Ошибка',
              appearance: 'negative',
            })
            .subscribe();
          return EMPTY;
        }),
        finalize(() => this.isChatLoading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((chat) => {
        this.openedChatService.setChat(chat);
      });
  }

  ngOnDestroy(): void {
    this.foundedMessagesInChatService.cleanFoundedMessages();
  }
}
