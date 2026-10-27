import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class MessagesSocketService {
  private socket: Socket | null = null;

  connect(): void {
    if (this.socket) {
      return;
    }

    this.socket = io('http://localhost:3005', {
      withCredentials: true,
      autoConnect: true,
    });
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }
}
