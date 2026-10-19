import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SearchHeader } from '../../components/search-chat-message-components/search-header/search-header';
import { SearchInput } from '../../components/search-chat-message-components/search-input/search-input';
import { SearchResults } from '../../components/search-chat-message-components/search-results/search-results';
import { OpenedChatService } from '../../services/opened-chat.service';

@Component({
  selector: 'app-search-chat-message-page',
  imports: [SearchHeader, SearchInput, SearchResults],
  templateUrl: './search-chat-message-page.html',
  styleUrl: './search-chat-message-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchChatMessagePage {
  private readonly openedChatService = inject(OpenedChatService);

  protected readonly chat = this.openedChatService.chat;
}
