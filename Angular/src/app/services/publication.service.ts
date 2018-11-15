import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Publication } from 'app/models';

@Injectable({
  providedIn: 'root'
})

export class PublicationService {
  API_ENDPOINT = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<Publication[]>(this.API_ENDPOINT + '/publications');
  }

  public getById(id: number) {
    return this.http.get<Publication[]>(this.API_ENDPOINT + '/publications/' + id);
  }

  public store(publication: Publication) {
    return this.http.post( this.API_ENDPOINT + '/publications', publication);
  }

  public update(publication: Publication) {
    return this.http.put(this.API_ENDPOINT + '/publications/'+ publication.id, publication);
  }

  public deleteById(id: number) {
    return this.http.delete(this.API_ENDPOINT + '/publications/' + id);
  }

}
