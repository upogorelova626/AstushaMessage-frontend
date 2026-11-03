import { Injectable } from '@angular/core';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { Subject } from 'rxjs';
import type { Message } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MessagesSocketService {
  private readonly newMessageSubject = new Subject<Message>();

  private socket: Socket | null = null;

  readonly newMessage$ = this.newMessageSubject.asObservable();

  connect(): void {
    this.socket = io('http://localhost:3005', {
      withCredentials: true,
      autoConnect: true,
    });

    this.socket.on('message: new', (message: Message) => {
      this.newMessageSubject.next(message);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Ошибка подключения Socket.IO:', error.message);
    });
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }

  joinChat(chatId: string): void {
    this.socket?.emit('chat:join', { chatId });
  }

  leaveChat(chatId: string): void {
    this.socket?.emit('chat:leave', { chatId });
  }
}
