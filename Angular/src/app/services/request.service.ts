import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Request } from '../models/Request';

@Injectable({
  providedIn: 'root'
})

export class RequestService {
  API_ENDPOINT = 'http://intuni.test/api';

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<Request[]>(this.API_ENDPOINT + '/requests');
  }

  public getById(id: number) {
    return this.http.get<Request[]>(this.API_ENDPOINT + '/requests/' + id);
  }

  public store(request: Request) {
    return this.http.post( this.API_ENDPOINT + '/requests', request);
  }

  public update(request: Request) {
    return this.http.put(this.API_ENDPOINT + '/requests/'+ request.id, request);
  }

  public deleteById(id: number) {
    return this.http.delete(this.API_ENDPOINT + '/requests/' + id);
  }

}
