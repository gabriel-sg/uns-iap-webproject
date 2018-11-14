import { Injectable } from '@angular/core';
import { Department } from '../models/department';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {
  API_ENDPOINT = 'http://intuni.test/api';

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<Department[]>(this.API_ENDPOINT + '/departments');
  }

  public getById(id: number) {
    return this.http.get<Department[]>(this.API_ENDPOINT + '/departments/' + id);
  }

  public store(department: Department) {
    return this.http.post( this.API_ENDPOINT + '/departments', department);
  }

  public update(department: Department) {
    return this.http.put(this.API_ENDPOINT + '/departments/'+ department.id, department);
  }

  public deleteById(id: number) {
    return this.http.delete(this.API_ENDPOINT + '/departments/' + id);
  }

}
