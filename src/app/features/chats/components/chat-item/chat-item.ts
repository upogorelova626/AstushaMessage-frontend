import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { Chat } from '../../../../shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-item',
  imports: [TuiButton],
  templateUrl: './chat-item.html',
  styleUrl: './chat-item.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatItem {
  private readonly router = inject(Router);

  readonly chat = input.required<Chat>();

  protected openChat(chatId: string) {
    this.router.navigate(['/chats', chatId]);
  }
}
