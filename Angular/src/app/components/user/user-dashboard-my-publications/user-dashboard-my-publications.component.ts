import { Component, OnInit } from '@angular/core';
import { Publication } from 'app/models';
import { PublicationService, AlertService } from 'app/services';

@Component({
  selector: 'app-user-dashboard-my-publications',
  templateUrl: './user-dashboard-my-publications.component.html',
  styleUrls: ['./user-dashboard-my-publications.component.css']
})
export class UserDashboardMyPublicationsComponent implements OnInit {
  publications: Publication[];

  constructor(
    private publicationService: PublicationService,
    private alertService: AlertService) { }

  ngOnInit()  {
    // Obtengo todas las solicitudes
    this.publicationService.getPublications(1).subscribe(data => {
      this.publications = data;
    },(error) => {
      console.log(error);
      this.alertService.error('Error al obtener las solicitudes', false);
    });
  }

  
  }


