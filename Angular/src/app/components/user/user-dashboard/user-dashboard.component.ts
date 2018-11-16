import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Publication } from 'app/models';
import { PublicationService } from 'app/services';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  API_ENDPOINT = environment.apiUrl;
  publications: Publication[];

  constructor(private publicationService: PublicationService, private httpClient: HttpClient) {
    httpClient.get(this.API_ENDPOINT + '/publications').subscribe( (data: Publication[]) => {
      this.publications = data;
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error al pedir a la DB las publicaciones');
    });
   }

  ngOnInit() {
  }

}






