
import { Injectable } from '@angular/core';
import { WebsocketService } from './web-socket.service';
import { Observable, Subject, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ChatService {

  messages: Subject<any>;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      pipe(map((response: any): any => {
        console.log('this is the response', response)
        return response;
      }))
   }

  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg) {
    console.log('am i getting this pic', msg)
    this.messages.next(msg);
  }

}