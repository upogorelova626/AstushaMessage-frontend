import { ChangeDetectionStrategy, Component, computed, inject, input, model } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import type { Chat } from '../../../../shared/interfaces';
import { ChatType } from '../../../../shared/interfaces';
import { CurrentUserService } from '../../../../shared/services/current-user.service';
import { ChatActionsButton } from '../chat-actions-button/chat-actions-button';
import { TuiHovered } from '@taiga-ui/cdk/directives/hovered';

@Component({
  selector: 'app-chat-item',
  imports: [TuiButton, TuiAvatar, TuiIcon, TuiHovered, ChatActionsButton],
  templateUrl: './chat-item.html',
  styleUrl: './chat-item.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatItem {
  private readonly router = inject(Router);
  private readonly currentUserService = inject(CurrentUserService);

  private readonly currentUser = toSignal(this.currentUserService.currentUser$);

  public readonly chat = input.required<Chat>();

  protected readonly isHovered = model<boolean>(false);
  protected readonly isMenuOpen = model<boolean>(false);

  protected readonly companion = computed(() => {
    const chat = this.chat();
    const currentUser = this.currentUser();

    if (chat.type !== ChatType.Private || !currentUser) {
      return null;
    }

    return (
      chat.participants.find((participant) => participant.userId !== currentUser.id)?.user ?? null
    );
  });

  protected readonly chatAvatar = computed(() => {
    const user = this.companion();

    return (
      user?.avatarUrl ||
      user?.firstName?.charAt(0).toUpperCase() ||
      user?.lastName?.charAt(0).toUpperCase() ||
      user?.login?.charAt(0).toUpperCase() ||
      null
    );
  });

  protected readonly chatTitle = computed(() => {
    const user = this.companion();

    const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ');

    return fullName || user?.login || null;
  });

  protected openChat(chatId: string): void {
    void this.router.navigate(['/chats', chatId]);
  }
}
