import { HttpHeaders } from '@angular/common/http';

export const ACCESS_TOKEN = 'access_token';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Config {
  static readonly backendUrl = 'http://localhost:4568';

  // Header für Get-Requests
  static readonly getHeaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
  // GET_HEADERS = GET_HEADERS.set('Access-Control-Allow-Origin', '*',);

  // Header für Post-Requests
  static readonly postHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
}
