import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Publication, Search } from 'app/models';

@Injectable({
  providedIn: 'root'
})

export class PublicationService {
  API_ENDPOINT = environment.apiUrl;
  public auxPublication: Publication;

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<Search>(this.API_ENDPOINT + '/publications');
  }

  public getByCategory(category: string){
    return this.http.get<Search>(this.API_ENDPOINT + '/publications/category/' + category);
  }

  public getById(id: number) {
    return this.http.get<Publication>(this.API_ENDPOINT + '/publications/' + id);
  }

  public store(publication: Publication) {
    return this.http.post<Publication>( this.API_ENDPOINT + '/publications', publication);
  }

  public update(publication: Publication) {
    return this.http.put(this.API_ENDPOINT + '/publications/'+ publication.id, publication);
  }

  public deleteById(id: number) {
    return this.http.delete(this.API_ENDPOINT + '/publications/' + id);
  }

  public getPublications(user_id: string) {
    return this.http.get<Publication[]>(this.API_ENDPOINT + '/users/getPublications/' + user_id );
  }

  public uploadPhoto(photo: FormData){
    return this.http.post(this.API_ENDPOINT + '/photos/upload',photo);
  }

  public getPhotos(id: number){
    return this.http.get(this.API_ENDPOINT + '/publications/photos/'+id);
  }

  public deleteAllPhotos(id: number){
    return this.http.delete(this.API_ENDPOINT + '/publications/photos/' + id);
  }

}
