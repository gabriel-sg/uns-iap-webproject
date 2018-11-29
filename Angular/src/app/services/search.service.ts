import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Search } from 'app/models';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  API_ENDPOINT = environment.apiUrl;
  public currentSearch: Search;

  constructor(private http: HttpClient) { }

  public searchPublications(search: string){
    //return this.http.get<Search>(this.API_ENDPOINT+'/searchPublications/'+search);
    this.http.get<Search>(this.API_ENDPOINT+'/searchPublications/'+search)
    .subscribe(
      data => {
        //console.log(data);
        this.currentSearch=data;
        console.log(this.currentSearch);
      },
      error =>{
        console.log(error);

      });
  }

  public getCurrentSearch(){
    return this.currentSearch;
  }
}
