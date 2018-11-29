import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  API_ENDPOINT = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public searchPublications(search: string){
    return this.http.get(this.API_ENDPOINT+'/searchPublications/'+search);
  }
}
