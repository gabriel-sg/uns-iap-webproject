import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Photo } from 'app/models';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  API_ENDPOINT = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getPhotos(id_user:number) {
    return this.http.get<Photo[]>(this.API_ENDPOINT + '/photos/getPhotos/' + id_user);


  }

  
}
