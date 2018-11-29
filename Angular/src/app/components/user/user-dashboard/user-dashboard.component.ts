import { Component, OnInit } from '@angular/core';
import { Publication, User } from 'app/models';
import { PublicationService, AlertService, AuthenticationService } from 'app/services';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  publications: Publication[];
  currentUser: User;

  constructor(
    private publicationService: PublicationService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService) { }

  ngOnInit()  {
    this.currentUser = this.authenticationService.currentUserValue;
    // Obtengo todas las solicitudes
    this.publicationService.getPublications(this.currentUser.id).subscribe(data => {
      this.publications = data;
    },(error) => {
      console.log(error);
      this.alertService.error('Error al obtener las solicitudes', false);
    });
  }


  }








