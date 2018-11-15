import { Component, OnInit } from '@angular/core';
import { RequestService, AlertService } from 'app/services';
import { Request } from 'app/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  requests: Request[];

  constructor(
    private requestService: RequestService,
    private alertService: AlertService
    ) { }

  ngOnInit() {
    // Obtengo todas las solicitudes
    this.requestService.getAll().subscribe(data => {
      this.requests = data;
    },(error) => {
      console.log(error);
      this.alertService.error('Error al obtener las solicitudes', false);
    });
  }

}
