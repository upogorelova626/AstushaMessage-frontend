import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class MessagesSocketService {
  private socket: Socket | null = null;

  connect(): void {
    console.log('Вызывается connect()');

    if (this.socket) {
      console.log('Socket уже создан');
      return;
    }

    this.socket = io('http://localhost:3005', {
      withCredentials: true,
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      console.log('Socket подключён:', this.socket?.id);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Ошибка подключения Socket.IO:', error.message);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket отключён:', reason);
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
