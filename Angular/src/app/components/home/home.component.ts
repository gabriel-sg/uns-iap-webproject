import { Component, OnInit } from '@angular/core';
import { RequestService, AlertService, UserService, DepartmentService } from 'app/services';
import { Request, Department, User } from 'app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  requests: Request[];
  departments: Department[] = [];
  user: User;
  haydeptos:boolean;

  constructor(
    private requestService: RequestService,
    private alertService: AlertService,
    private router:Router,
    private userService: UserService,
    private departmentService: DepartmentService
    ) { }

  ngOnInit() {
    // Obtengo todas las solicitudes
    this.requestService.getAll().subscribe(data => {
      this.requests = data;
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
    })
  }

  category(category){
    console.log(category);
    this.router.navigate(['/search-result'], { queryParams: { type: 'category', busqueda: category }});
  }

  userData(user_id){
    this.userService.getById(user_id).subscribe(
      data=>{
        this.user=data[0];
    },
      error=>{
        console.log(error);
    });
  }

  nuevasPublicaciones(){
    this.router.navigate(['/search-result'], { queryParams: { type: 'nuevas-publicaciones'}});
  }

}
