import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OpenedChatService } from '../../../services/opened-chat.service';
import { ChatSearchMessageItem } from '../chat-search-message-item/chat-search-message-item';
import { FoundedMessagesInChatService } from '../../../services/founded-messages-in-chat.service';

@Component({
  selector: 'app-search-results',
  imports: [ChatSearchMessageItem],
  templateUrl: './search-results.html',
  styleUrl: './search-results.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResults {
  private readonly openedChatService = inject(OpenedChatService);
  private readonly foundedMessagesInChatService = inject(FoundedMessagesInChatService);

  protected readonly title = this.openedChatService.chatTitle;

  protected readonly messageList = this.foundedMessagesInChatService.messagesList;

  protected readonly foundedMessages = this.foundedMessagesInChatService.messagesList()?.items;

  protected readonly isSearching = this.foundedMessagesInChatService.isSearching;
  protected readonly isLoading = this.foundedMessagesInChatService.isLoading;
}
