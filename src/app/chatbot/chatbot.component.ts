import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { ApiControllerService } from '../controller/api-controller.service';
import { genericTextConversation } from '../interfaces/genericTextConversation';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.sass'],
})
export class ChatbotComponent implements OnInit {
  messages = [];
  loading = false;
  greeting: string;
  startEvent = [
    {
      name: 'greeting',
      payload: { eventCategory: 'test', eventAction: 'test', source: 'test' },
      tpKey: 'de',
      scope: 'event',
    },
  ];
  constructor(private readonly service: ApiControllerService) {}

  ngOnInit(): void {
    this.sendEvent(this.startEvent);
  }

  async handleUserMessage(event) {
    console.log(event);
    let textEvent = [
      {
        name: 'greeting',
        payload: {
          eventCategory: 'test',
          eventAction: 'test',
          source: 'test',
        },
        tpKey: 'de',
        scope: 'event',
      },
    ];
    const text = event.message;
    this.sendEvent(this.startEvent);

    this.addUserMessage(text);
    this.loading = true;
    await timer(1000).pipe(take(1)).toPromise();

    this.addBotMessage('Cool');
    this.loading = false;
  }

  addUserMessage(text) {
    this.messages.push({
      text,
      sender: 'You',
      reply: true,
      date: new Date(),
    });
  }

  addBotMessage(text) {
    this.messages.push({
      text,
      sender: 'BAICA',
      avatar: '/assets/chatbot.jpeg',
      date: new Date(),
    });
  }

  private sendEvent(events: any) {
    this.service
      .find(events, '/action')
      .subscribe((event: genericTextConversation[]) => {
        console.log('bricks from event api', event);
        this.greeting = event[0].content.data.title;
        this.addBotMessage(this.greeting);
      });
  }
}
