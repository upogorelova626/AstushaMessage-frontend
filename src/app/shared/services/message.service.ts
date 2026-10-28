import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Message, MessagePayload } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly http = inject(HttpClient);

  private readonly astushaMessengerApiUrl = 'http://localhost:3005';

  sendNewMessage(chatId: string, payload: MessagePayload): Observable<Message> {
    return this.http.post<Message>(
      `${this.astushaMessengerApiUrl}/chats/${chatId}/messages`,
      payload,
    );
  }

  getMessage(chatId: string, messageId: string): Observable<Message> {
    return this.http.get<Message>(
      `${this.astushaMessengerApiUrl}/chats/${chatId}/messages/${messageId}`,
    );
  }

  getAllMessages() {}

  editMessage(chatId: string, messageId: string, payload: MessagePayload): Observable<Message> {
    return this.http.patch<Message>(
      `${this.astushaMessengerApiUrl}/chats/${chatId}/messages/${messageId}`,
      payload,
    );
  }

  deleteMessage(chatId: string, messageId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.astushaMessengerApiUrl}/chats/${chatId}/messages/${messageId}`,
    );
  }
}
