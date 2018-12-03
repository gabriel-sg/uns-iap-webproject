import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PublicationService, AlertService} from 'app/services';
import { Publication } from 'app/models';

@Component({
  selector: 'app-publication-item',
  templateUrl: './publication-item.component.html',
  styleUrls: ['./publication-item.component.css']
})
export class PublicationItemComponent implements OnInit {

  publicacion: Publication;
  mapeo = new Map();
  photos : String [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private publicationService: PublicationService
  ) { }

  ngOnInit()  {
   // Obtengo todas las solicitudes con el correspondiente Id de usuario
    this.publicationService.getById(+this.route.snapshot.paramMap.get('id')).subscribe(data => {
      this.publicacion = data;
      this.publicationService.getPhotos(+this.route.snapshot.paramMap.get('id')).subscribe(data => {
        this.photos=(<String[]>data);
        this.mapeo.set(0,this.photos[0]);
      },(error) => {
        console.log(error);
        this.alertService.error('Error al obtener las fotos', false);
      });
    },(error) => {
      console.log(error);
      this.alertService.error('Error al obtener las solicitudes', false);
    });
  }

}

