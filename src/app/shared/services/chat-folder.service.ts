import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { ChatFolder, CreateNewFolder } from '../interfaces';
import type { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatFolderService {
  private readonly http = inject(HttpClient);

  private readonly astushaMessengerApiUrl = 'http://localhost:3005';

  createNewFolder(payload: CreateNewFolder): Observable<ChatFolder> {
    return this.http.post<ChatFolder>(`${this.astushaMessengerApiUrl}/chat-folders`, payload);
  }

  getAllFolders(): Observable<ChatFolder[]> {
    return this.http.get<ChatFolder[]>(`${this.astushaMessengerApiUrl}/chat-folders`);
  }
}
