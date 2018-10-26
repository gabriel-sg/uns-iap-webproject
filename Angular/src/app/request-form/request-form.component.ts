import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../services/department.service';
import { HttpClient } from '@angular/common/http';
import { Department } from '../interfaces/department';
import { Request } from '../interfaces/Request';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {
  API_ENDPOINT = 'http://intuni.test/api';
  deptos: Department[];
  request: Request = {
    title: null,
    description: null,
    department: null,
    category: 'Libro', //Inicial
    user_id: null,
    created_at: null,
    updated_at: null
  };

  constructor(private departmentService: DepartmentService, private requestService: RequestService, private httpClient: HttpClient) {
    // Http get de los departamentos
    httpClient.get(this.API_ENDPOINT + '/departments').subscribe( (data: Department[]) => {
      this.deptos = data;
      this.request.department = this.deptos[0].name;
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });

  }

  ngOnInit() {
  }

  saveRequest(){
    // Http post de la solicitud creada
    this.requestService.save(this.request).subscribe( (data) => {
      alert('Solicitud creada');
    }, (error) => {
      alert('Ocurrio un error inesperado');
    });
  }

}
