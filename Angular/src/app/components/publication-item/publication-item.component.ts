import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PublicationService, AlertService, UserService, DepartmentService} from 'app/services';
import { Publication, User, Department } from 'app/models';

@Component({
  selector: 'app-publication-item',
  templateUrl: './publication-item.component.html',
  styleUrls: ['./publication-item.component.css']
})
export class PublicationItemComponent implements OnInit {
  usuario: User ; 
  publicacion: Publication;
  mapeo = new Map();
  photos : String [];
  haydeptos:boolean;
  departments: Department[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private publicationService: PublicationService,
    private userService: UserService,
    private departmentService: DepartmentService
  ) { }

  ngOnInit()  {
   // Obtengo todas las solicitudes con el correspondiente Id de usuario
   
    this.publicationService.getById(+this.route.snapshot.paramMap.get('id')).subscribe(data => {
      this.publicacion = data[0];
      this.publicationService.getPhotos(+this.route.snapshot.paramMap.get('id')).subscribe(data => {
        this.photos=(<String[]>data);
        this.mapeo.set(0,this.photos[0]);
        this.userService.getById(this.publicacion.user_id).subscribe(data=> {
          this.usuario=data[0];
          console.log(this.usuario);
          console.log(this.publicacion);
        }
        , error=> {
          console.log(error);
          this.alertService.error('Error al obtener el usuario', false);
        });
      },(error) => {
        console.log(error);
        this.alertService.error('Error al obtener las fotos', false);
      });
    },(error) => {
      console.log(error);
      this.alertService.error('Error al obtener las solicitudes', false);
    });
    this.departmentService.getAll().subscribe(data => {
      this.departments = data;
      this.haydeptos=true;
    }, error =>{
      console.log(error);
      this.alertService.error('Error al obtener los departamentos', false);
    });




      
  }
}


//this.publicationService.getById(this.publicacion.user_id).subscribe(data => {
//  this.user=(data);
//},(error) => {
//  console.log(error);
//  this.alertService.error('Error al obtener las fotos', false);
//});




