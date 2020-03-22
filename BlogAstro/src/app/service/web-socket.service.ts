import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { ConnectableObservable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() {
    this.socket = io(this.uri);
  }

  socket: any;
  readonly uri: string = "ws://localhost:3000/";

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
