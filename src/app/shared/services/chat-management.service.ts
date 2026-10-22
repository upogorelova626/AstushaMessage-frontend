import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatManagementService {
  private readonly http = inject(HttpClient);

  private readonly astushaMessengerApiUrl = 'http://localhost:3005';

  clearChat(chatId: string) {
    return this.http.delete(`${this.astushaMessengerApiUrl}/chat-management${chatId}/messages`);
  }

  deleteChat(chatId: string) {
    return this.http.delete(`${this.astushaMessengerApiUrl}/chat-management${chatId}`);
  }
}
