import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { timer, take } from 'rxjs';
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
  startEvent = [
    {
      name: 'greeting',
      payload: { eventCategory: 'test', eventAction: 'test' },
      tpKey: 'de',
      scope: 'event',
    },
  ];
  buttons = [];
  constructor(private readonly service: ApiControllerService) {}
  ngOnInit(): void {
    this.sendEvent(this.startEvent);
  }

  async handleUserMessage(event) {
    // this.buttons = [];
    console.log('handleUserMessage', event);

    const text = event.message;
    let textEvent = [
      {
        payload: {
          eventCategory: 'test',
          eventAction: 'test',
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
  }

  async addUserMessage(text) {
    this.messages.push({
      text,
      sender: 'Du',
      reply: true,
      date: new Date(),
    });
    await timer(1).pipe(take(1)).toPromise();

    window.scroll({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  async addBotMessage(text: string, type: string, name: string, id: string) {
    this.messages.push({
      type,
      text,
      sender: 'BAICA',
      avatar: '/assets/chatbot.jpeg',
      date: new Date(),
      name: name,
      _id: id,
    });
    await timer(1).pipe(take(1)).toPromise();

    window.scroll({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  onSubmitClick(id: string) {
    this.buttons = [];
    console.log(id);
    let textEvent = [
      {
        payload: {
          eventCategory: 'test',
          eventAction: 'test',
        },
        tpKey: 'de',
        scope: 'event',
        suggestedOptions: { _id: id },
      },
    ];
    this.sendEvent(textEvent);
  }

  private sendEvent(events: any) {
    this.service
      .find(events, '/action')
      .subscribe((event: genericTextConversation[]) => {
        console.log('bricks from event api', event);
        if (event.length > 0) {
          event.forEach((e) => {
            let eventResponse = e.content.data.title;
            let type = 'text';
            this.addBotMessage(eventResponse, type, '', '');
            this.loading = false;
            if (e.suggestedOptions.length > 0) {
              e.suggestedOptions.forEach((so) => {
                type = 'button';
                this.addBotMessage(eventResponse, type, so.name, so._id);
              });
            }
          });
        }
        if (event.length === 0) {
          this.sendEvent(events);
        }
      });
  }

  private login(events: any) {
    this.service.find(events, '/test');
  }
}
