import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { HttpClient } from '@angular/common/http';
import { Request } from '../interfaces/Request';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  API_ENDPOINT = 'http://intuni.test/api';
  requests: Request[];

  constructor(private requestService: RequestService, private httpClient: HttpClient) {
    httpClient.get(this.API_ENDPOINT + '/requests').subscribe( (data: Request[]) => {
      this.requests = data;
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error al pedir a la DB las solicitudes');
    });
  }

  ngOnInit() {
  }

}
