import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Message, PinMessagePayload } from '../interfaces';
import type { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageActionsService {
  private readonly astushaMessengerApiUrl = 'http://localhost:3005';

  private readonly http = inject(HttpClient);

  pinMessage(chatId: string, messageId: string, payload: PinMessagePayload): Observable<Message> {
    return this.http.patch<Message>(
      `${this.astushaMessengerApiUrl}/chats/${chatId}/messages/${messageId}/pin`,
      payload,
    );
  }

  unpinMessage(chatId: string, messageId: string): Observable<Message> {
    return this.http.delete<Message>(
      `${this.astushaMessengerApiUrl}/chats/${chatId}/messages/${messageId}/pin`,
    );
  }
}
