import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Chat, CreateChat } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly http = inject(HttpClient);

  private readonly astushaMessageApiUrl = 'http://localhost:3005';

  createChat(payload: CreateChat): Observable<Chat> {
    return this.http.post<Chat>(`${this.astushaMessageApiUrl}/chats`, payload, {
      withCredentials: true,
    });
  }
}
