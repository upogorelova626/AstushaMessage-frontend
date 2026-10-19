import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OpenedChatService } from '../../../services/opened-chat.service';

@Component({
  selector: 'app-search-results',
  imports: [],
  templateUrl: './search-results.html',
  styleUrl: './search-results.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResults {
  private readonly openedChatService = inject(OpenedChatService);

  protected readonly title = this.openedChatService.chatTitle;
}
