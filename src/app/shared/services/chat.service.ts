import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Chat, CreateChat, GetChatRequest } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly http = inject(HttpClient);

  private readonly astushaMessengerApiUrl = 'http://localhost:3005';

  createChat(payload: CreateChat): Observable<Chat> {
    return this.http.post<Chat>(`${this.astushaMessengerApiUrl}/chats`, payload, {
      withCredentials: true,
    });
  }

  getAllChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.astushaMessengerApiUrl}/chats`, {
      withCredentials: true,
    });
  }

  getChat(chatId: string): Observable<Chat> {
    return this.http.get<Chat>(`${this.astushaMessengerApiUrl}/chats/${chatId}`, {
      withCredentials: true,
    });
  }
}
