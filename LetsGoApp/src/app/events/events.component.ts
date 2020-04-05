import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  trips = [{location: 'bora bora', description: 'because you deserve it'}, {location: 'maldives', description: 'its beautiful there i swear'}];
  users = [{name: 'carine', time: 'tomorrow'}, {name: 'jayden', time: 'today'}];

  constructor(private _eventService: EventService, private chat: ChatService) { }

  ngOnInit(): void {
    this._eventService.getEvents()
    .subscribe(
      res => this.trips = res,
      err => console.log(err)
    )


    this.chat.messages.subscribe(msg => {
      console.log(msg);
    })
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, 
        event.previousIndex, 
        event.currentIndex
      )
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }

  sendMessage() {
    console.log('this is sent')
    this.chat.sendMsg("Test Message");
  }
}
