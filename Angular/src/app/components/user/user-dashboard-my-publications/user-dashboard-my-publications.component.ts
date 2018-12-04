import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
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
    // this.publicationService.auxPublication = publication;
    this.router.navigate(['/mi-cuenta/edit-publication'], { queryParams: { id: publicationId }});
  }

  private pausar(publication: Publication) {
    // Solucion momentanea para que la viste no se actualize antes que el backend
    const publi = new Publication;
    publi.id = publication.id;
    publi.title = publication.title;
    publi.description = publication.description;
    publi.visible = !publication.visible;
    publi.category = publication.category;
    publi.user_id = publication.user_id;
    publi.department_id = publication.department_id;

    this.publicationService.update(publi).subscribe(
      success => {
        if(publication.visible){
          this.alertService.success("Publicación pausada.");
        }
        else{
          this.alertService.success("Publicación reanudada.");
        }
        publication.visible = !publication.visible;
      }, error => {
        publication.visible = !publication.visible;
        this.alertService.error("No se pudo actualizar la publicación.")
        console.log(error);
      }
    );
  }





}
