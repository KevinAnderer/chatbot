export interface MessageShared {
  message: string;
  title: string;
}

export class Message {
  private constructor(public message: string, public title: string) {}

  static createMessage(message: string, title: string): Message {
    console.log('MESSAGE_CREATE', typeof message);
    console.log(message);
    return new Message(message, title);
  }
}
