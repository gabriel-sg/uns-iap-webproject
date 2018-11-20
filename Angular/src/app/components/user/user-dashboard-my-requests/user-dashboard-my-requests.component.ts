import { Component, OnInit } from '@angular/core';
import { RequestService, AlertService } from 'app/services';
import { Request } from 'app/models';

@Component({
  selector: 'app-user-dashboard-my-requests',
  templateUrl: './user-dashboard-my-requests.component.html',
  styleUrls: ['./user-dashboard-my-requests.component.css']
})
export class UserDashboardMyRequestsComponent implements OnInit {
  requests: Request [];
  constructor(    
    private requestService: RequestService,
    private alertService: AlertService) { }

    ngOnInit()  {
      // Obtengo todas las solicitudes con el correspondiente Id de usuario 
      this.requestService.getRequests(1).subscribe(data => {
        this.requests = data;
      },(error) => {
        console.log(error);
        this.alertService.error('Error al obtener las solicitudes', false);
      });
    }

}

