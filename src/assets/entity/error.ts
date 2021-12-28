import { HttpErrorResponse } from '@angular/common/http';
import { Message } from './message';

export class SaveError {
  constructor(readonly statuscode: number, readonly cause?: Error | string) {}

  buildMessage(): Message {
    if (this.cause instanceof HttpErrorResponse) {
      const message = Message.createMessage(
        'HttpErrorResponse: Statuscode: ' +
          this.statuscode.toString() +
          '\n' +
          'Cause: ' +
          this.cause.message,
        'Fehler bei Post-Request'
      );
      console.log('MESSAGE:', message);
      return message;
    } else if (this.cause instanceof Error) {
      const message = Message.createMessage(
        'ErrorInstance Statuscode: ' +
          this.statuscode.toString() +
          '\n' +
          'Cause: ' +
          this.cause.message +
          '\n' +
          'Stack; ' +
          this.cause.stack,
        'Fehler bei Post-Request'
      );
      return message;
    } else {
      const message = Message.createMessage(
        'Sonstiger Fehler Statuscode: ' +
          this.statuscode.toString() +
          '\n' +
          'Cause: ' +
          this.cause +
          '\n',
        'Fehler bei Post-Request'
      );
      return message;
    }
  }
}
