import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { TuiButton, TuiHint } from '@taiga-ui/core';
import { TuiAvatar, TuiSkeleton } from '@taiga-ui/kit';
import { ChatMenuButton } from '../chat-menu-button/chat-menu-button';
import { Router } from '@angular/router';
import { OpenedChatService } from '../../../services/opened-chat.service';

@Component({
  selector: 'app-chat-header',
  imports: [TuiButton, TuiAvatar, TuiHint, ChatMenuButton, TuiSkeleton],
  templateUrl: './chat-header.html',
  styleUrl: './chat-header.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatHeader {
  private readonly router = inject(Router);
  private readonly openedChatService = inject(OpenedChatService);

  readonly isChatLoading = input.required<boolean>();

  protected openSearch() {
    const chatId = this.chat()?.id;

    this.router.navigate(['/chats', chatId, 'search']);
  }

  protected readonly chat = this.openedChatService.chat;

  protected readonly chatTitle = this.openedChatService.chatTitle;

  protected readonly chatAvatar = this.openedChatService.chatAvatar;
}
