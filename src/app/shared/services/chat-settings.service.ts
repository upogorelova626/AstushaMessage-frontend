import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ArchiveChatRequest,
  Chat,
  FavoriteChatRequest,
  MuteChatRequest,
  PinChatRequest,
} from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatSettingsService {
  private readonly http = inject(HttpClient);

  private readonly astushaMessengerApiUrl = 'http://localhost:3005';

  archiveChat(chatId: string, payload: ArchiveChatRequest): Observable<Chat> {
    return this.http.patch<Chat>(
      `${this.astushaMessengerApiUrl}/chat-settings/${chatId}/archive`,
      payload,
      { withCredentials: true },
    );
  }

  pinChat(chatId: string, payload: PinChatRequest): Observable<Chat> {
    return this.http.patch<Chat>(
      `${this.astushaMessengerApiUrl}/chat-settings/${chatId}/pin`,
      payload,
      { withCredentials: true },
    );
  }

  favoriteChat(chatId: string, payload: FavoriteChatRequest): Observable<Chat> {
    return this.http.patch<Chat>(
      `${this.astushaMessengerApiUrl}/chat-settings/${chatId}/favorite`,
      payload,
      { withCredentials: true },
    );
  }

  muteChat(chatId: string, payload: MuteChatRequest): Observable<Chat> {
    return this.http.patch<Chat>(
      `${this.astushaMessengerApiUrl}/chat-settings/${chatId}/mute`,
      payload,
      { withCredentials: true },
    );
  }
}
