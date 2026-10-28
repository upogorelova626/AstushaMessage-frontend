import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ChatHeader } from '../../components/chat-components/chat-header/chat-header';
import { ChatMessages } from '../../components/chat-components/chat-messages/chat-messages';
import { MessageInput } from '../../components/chat-components/message-input/message-input';
import { ChatService } from '../../../../shared/services/chat.service';
import { catchError, EMPTY, finalize } from 'rxjs';
import { OpenedChatService } from '../../services/opened-chat.service';
import { ActivatedRoute } from '@angular/router';
import { TuiNotificationService } from '@taiga-ui/core';
import { MessagesSocketService } from '../../../../shared/services/messages-socket.service';

@Component({
  selector: 'app-chat-page',
  imports: [ChatHeader, ChatMessages, MessageInput],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly alerts = inject(TuiNotificationService);

  private readonly chatService = inject(ChatService);
  private readonly openedChatService = inject(OpenedChatService);
  private readonly messagesSocketService = inject(MessagesSocketService);

  protected readonly isChatLoading = signal<boolean>(false);

  ngOnInit(): void {
    const chatId = this.route.snapshot.paramMap.get('chatId');

    if (!chatId) {
      return;
    }

    this.isChatLoading.set(true);

    this.chatService
      .getChat(chatId)
      .pipe(
        catchError(() => {
          this.alerts
            .open('Не удалось открыть чат', { label: 'Ошибка', appearance: 'negative' })
            .subscribe();
          return EMPTY;
        }),
        finalize(() => this.isChatLoading.set(false)),
      )
      .subscribe((chat) => {
        this.openedChatService.setChat(chat);
      });

    this.messagesSocketService.connect();
  }
}
