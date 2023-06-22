import { Component } from '@angular/core';
import { ChatService } from 'src/app/shared/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: string[] = [];
  newMessage: string | any;

  constructor(private chatservice:ChatService){}

  ngOnInit(){
    this.chatservice.getMessages().subscribe((message:any) => {
      this.messages.push(message);
    });
  }
  sendMessage() {
    if (this.newMessage) {
      this.chatservice.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }
}
