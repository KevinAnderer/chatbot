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
  eventResponse: string;
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
    console.log('handleUserMessage', event);

    const text = event.message;
    let textEvent = [
      {
        payload: {
          eventCategory: 'test',
          eventAction: 'test',
          source: 'test',
        },
        tpKey: 'de',
        scope: 'event',
        text: text,
      },
    ];
    this.addUserMessage(text);

    this.loading = true;
    await timer(1000).pipe(take(1)).toPromise();
    this.sendEvent(textEvent);
    this.loading = false;
  }

  addUserMessage(text) {
    this.messages.push({
      text,
      sender: 'Du',
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
        let limit = 0;
        event.forEach((e) => {
          this.eventResponse = e.content.data.title;
          this.addBotMessage(this.eventResponse);
          this.loading = false;
        });
        if (event.length === 0 && limit < 3) {
          limit += 1;
          this.sendEvent(events);
          // this.addBotMessage(
          //   'Huch scheint so als hätte ich kurz die Verbindung verloren, können Sie das bitte nochmals wiederholen?'
          // );
        }
      });
  }
}
