import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { TuiButton, TuiHint } from '@taiga-ui/core';
import { TuiAvatar, TuiSkeleton } from '@taiga-ui/kit';
import { ChatMenuButton } from '../chat-menu-button/chat-menu-button';
import { OpenedChatService } from '../../../services/opened-chat.service';
import { ActionsWithChatService } from '../../../services/actions-with-chat.service';

@Component({
  selector: 'app-chat-header',
  imports: [TuiButton, TuiAvatar, TuiHint, ChatMenuButton, TuiSkeleton],
  templateUrl: './chat-header.html',
  styleUrl: './chat-header.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatHeader {
  private readonly openedChatService = inject(OpenedChatService);
  private readonly actionsWithChatService = inject(ActionsWithChatService);

  protected readonly chatTitle = this.openedChatService.chatTitle;

  protected readonly chatAvatar = this.openedChatService.chatAvatar;

  readonly isChatLoading = input.required<boolean>();

  protected openSearch() {
    this.actionsWithChatService.openSearchMessageInChatPage();
  }
}
