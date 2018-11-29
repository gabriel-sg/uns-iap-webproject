import { Component, OnInit } from '@angular/core';
import { RequestService, AlertService, AuthenticationService } from 'app/services';
import { Request, User } from 'app/models';

@Component({
  selector: 'app-user-dashboard-my-requests',
  templateUrl: './user-dashboard-my-requests.component.html',
  styleUrls: ['./user-dashboard-my-requests.component.css']
})
export class UserDashboardMyRequestsComponent implements OnInit {
  requests: Request [];
  currentUser: User;

  constructor(
    private requestService: RequestService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService) { }

    ngOnInit()  {
      this.currentUser = this.authenticationService.currentUserValue;

      // Obtengo todas las solicitudes con el correspondiente Id de usuario
      this.requestService.getRequests(this.currentUser.id).subscribe(data => {
        this.requests = data;
      },(error) => {
        console.log(error);
        this.alertService.error('Error al obtener las solicitudes', false);
      });
    }

}

