import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { User } from 'app/models';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  API_ENDPOINT = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<User[]>(this.API_ENDPOINT + '/users');
  }

  public getById(id: number) {
    return this.http.get<User[]>(this.API_ENDPOINT + '/users/' + id);
  }

  public store(user: User) {
    return this.http.post( this.API_ENDPOINT + '/users', user);
  }

  public update(user: User) {
    return this.http.put(this.API_ENDPOINT + '/users/'+ user.id, user);
  }

  public deleteById(id: number) {
    return this.http.delete(this.API_ENDPOINT + '/users/' + id);
  }

  public getRequests(user_id: number) {
    return this.http.get<Request[]>(this.API_ENDPOINT + '/users/users/' + user_id);
  }

}
