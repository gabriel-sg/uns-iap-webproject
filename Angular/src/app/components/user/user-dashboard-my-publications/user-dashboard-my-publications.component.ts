import { Component, OnInit } from '@angular/core';
import { Publication, User, Photo } from 'app/models';
import { PublicationService, AlertService, AuthenticationService, PhotoService } from 'app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-dashboard-my-publications',
  templateUrl: './user-dashboard-my-publications.component.html',
  styleUrls: ['./user-dashboard-my-publications.component.css']
})
export class UserDashboardMyPublicationsComponent implements OnInit {
  publications: Publication[];
  currentUser: User;

  photos = new Map();


  constructor(
    private publicationService: PublicationService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private photoService: PhotoService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;

    // Obtengo todas las publicaciones con sus respectivas fotos
    this.publicationService.getPublications(this.currentUser.id).subscribe(data => {
      this.publications = data;
      for (let entry of this.publications) {
        this.publicationService.getPhotos(entry.id).subscribe(data => {
          this.photos.set(entry.id, data[0]);
        }, (error) => {
          console.log(error);
          this.alertService.error('Error al obtener las fotos', false);
        });
      }

    }, (error) => {
      console.log(error);
      this.alertService.error('Error al obtener las solicitudes', false);
    });
  }

  private eliminar(publicationId: number) {
    this.publicationService.deleteById(publicationId).subscribe(
      success => {
        this.ngOnInit();
        this.alertService.success("Publicación eliminada.");
      }, error => {
        this.alertService.error("No se pudo eliminar la publicación.");
      }
    );
  }

  private modificar(publicationId: number) {

  }

  private pausar(publication: Publication) {
    publication.visible = !publication.visible;
    this.publicationService.update(publication).subscribe(
      success => {
        if(publication.visible){
          this.alertService.success("Publicación reanudada.");
        }
        else{
          this.alertService.success("Publicación pausada.");
        }
      }, error => {
        publication.visible = !publication.visible;
        this.alertService.error("No se pudo actualizar la publicación.")
        console.log(error);
      }
    );
  }




}
