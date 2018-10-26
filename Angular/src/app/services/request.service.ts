import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Request } from '../interfaces/Request';

@Injectable({
  providedIn: 'root'
})

export class RequestService {
  API_ENDPOINT = 'http://intuni.test/api';

  constructor(private httpClient: HttpClient) { }

  save(request: Request){
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + '/requests', request, {headers: headers});
  }

}
