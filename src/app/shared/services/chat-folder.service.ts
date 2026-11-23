import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { ChatList, CreateNewChatsList, EditChatsList } from '../interfaces';
import type { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatFolderService {
  private readonly http = inject(HttpClient);

  private readonly astushaMessengerApiUrl = 'http://localhost:3005';

  createNewChatsList(payload: CreateNewChatsList): Observable<ChatList> {
    return this.http.post<ChatList>(`${this.astushaMessengerApiUrl}/chat-folders`, payload);
  }

  getAllChatsLists(): Observable<ChatList[]> {
    return this.http.get<ChatList[]>(`${this.astushaMessengerApiUrl}/chat-folders`);
  }

  editChatsList(folderId: string, payload: EditChatsList): Observable<ChatList> {
    return this.http.patch<ChatList>(
      `${this.astushaMessengerApiUrl}/chat-folders/${folderId}`,
      payload,
    );
  }

  deleteChatsList(folderId: string): Observable<void> {
    return this.http.delete<void>(`${this.astushaMessengerApiUrl}/chat-folders/${folderId}`);
  }

  addChatToFolder(folderId: string, chatId: string): Observable<void> {
    return this.http.post<void>(
      `${this.astushaMessengerApiUrl}/chat-folders/${folderId}/chats/${chatId}`,
      null,
    );
  }

  deleteChatFromFolder(folderId: string, chatId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.astushaMessengerApiUrl}/chat-folders/${folderId}/chats/${chatId}`,
    );
  }
}
