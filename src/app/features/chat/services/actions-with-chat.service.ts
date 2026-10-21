import { computed, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OpenedChatService } from './opened-chat.service';

@Injectable({
  providedIn: 'root',
})
export class ActionsWithChatService {
  private readonly openedChatService = inject(OpenedChatService);

  private readonly router = inject(Router);

  private readonly chatId = computed(() => this.openedChatService.chat()?.id);

  openContactDetailsPage() {}

  openSearchMessageInChatPage() {
    const id = this.chatId();

    if (id) {
      this.router.navigate(['/chats', id, 'search']);
    }
  }

  selectChatMessages() {}

  turnOffSound() {}

  turnOffDisappearingMessages() {}

  openChatThemesPage() {}

  deleteFromFavourites() {}

  changeList() {}

  exportChat() {}

  closeChat() {
    this.router.navigate(['/chats']);
  }

  sendCallLink() {}

  startNewGroupCall() {}

  complain() {}

  block() {}

  cleanChat() {}

  deleteChat() {}
}
