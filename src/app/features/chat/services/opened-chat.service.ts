import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Chat, ChatType } from '../../../shared/interfaces';
import { CurrentUserService } from '../../../shared/services/current-user.service';

@Injectable({
  providedIn: 'root',
})
export class OpenedChatService {
  private readonly currentUserService = inject(CurrentUserService);

  private readonly currentUser = toSignal(this.currentUserService.currentUser$);

  readonly chat = signal<Chat | null>(null);

  readonly isChatLoading = signal(false);

  readonly companion = computed(() => {
    const chat = this.chat();
    const currentUser = this.currentUser();

    if (!chat || chat.type !== ChatType.Private || !currentUser) {
      return null;
    }

    return (
      chat.participants.find((participant) => participant.userId !== currentUser.id)?.user ?? null
    );
  });

  readonly chatTitle = computed(() => {
    const user = this.companion();

    const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ');

    return fullName || user?.login || null;
  });

  readonly chatAvatar = computed(() => {
    const user = this.companion();

    return (
      user?.avatarUrl ||
      user?.firstName?.charAt(0).toUpperCase() ||
      user?.lastName?.charAt(0).toUpperCase() ||
      user?.login?.charAt(0).toUpperCase() ||
      null
    );
  });

  setChat(chat: Chat | null): void {
    this.chat.set(chat);
  }

  clearChat(): void {
    this.chat.set(null);
  }
}
