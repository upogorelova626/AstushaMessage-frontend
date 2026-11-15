import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TuiItem } from '@taiga-ui/cdk';
import { TuiHovered } from '@taiga-ui/cdk/directives/hovered';
import { TuiButton, TuiCarousel, TuiIcon } from '@taiga-ui/core';
import { TuiSkeleton } from '@taiga-ui/kit';
import { PinnedMessagesStoreService } from '../../../services/pinned-messages-store.service';
import { ActionsWithPinnedMessagesButton } from '../actions-with-pinned-messages-button/actions-with-pinned-messages-button';

@Component({
  selector: 'app-chat-pinned-messages',
  imports: [
    TuiIcon,
    TuiButton,
    TuiHovered,
    TuiCarousel,
    TuiItem,
    TuiSkeleton,
    ActionsWithPinnedMessagesButton,
  ],
  templateUrl: './chat-pinned-messages.html',
  styleUrl: './chat-pinned-messages.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPinnedMessages {
  private readonly pinnedMessagesStoreService = inject(PinnedMessagesStoreService);

  readonly open = signal(false);

  protected readonly pinnedMessages = this.pinnedMessagesStoreService.pinnedMessages;
  protected readonly isPinnedMessagesLoading =
    this.pinnedMessagesStoreService.isPinnedMessagesLoading;

  protected isButtonVisible = signal(false);
  protected index = signal(0);

  protected max = computed(() => this.pinnedMessages().length);

  nextPinnedMessage(): void {
    if (this.index() === this.max()) {
      this.index.set(0);
    }
    this.index.set(this.index() + 1);
  }
}
