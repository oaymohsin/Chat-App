import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;
  constructor() { 
    this.socket = io('http://localhost:3000');
  }
  sendMessage(message: string) {
    this.socket.emit('chat message', message);
  }
  getMessages(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('chat message', (message: string) => {
        observer.next(message);
      });
    });
  }
}
