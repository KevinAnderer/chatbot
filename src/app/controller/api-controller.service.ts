import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { SaveError } from 'src/assets/entity/error';
import { Config } from 'src/config';
import { pathToFileURL } from 'url';
import { genericTextConversation } from '../interfaces/genericTextConversation';

@Injectable({
  providedIn: 'root',
})
export class ApiControllerService {
  constructor(private readonly httpClient: HttpClient) {}

  find(obj: any, path: string): Observable<any> {
    return this.httpClient
      .post(Config.backendUrl + path, obj, {
        headers: Config.postHeaders,
      })
      .pipe(
        catchError((err: unknown) => {
          const errRespone = err as HttpErrorResponse;
          return of(new SaveError(errRespone.status, errRespone));
        })
      );
  }
}
