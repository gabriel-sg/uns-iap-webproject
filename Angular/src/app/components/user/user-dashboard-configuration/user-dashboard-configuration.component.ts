import { Component, OnInit } from '@angular/core';
import { Department, User } from 'app/models';
import { DepartmentService, UserService, AlertService } from 'app/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-user-dashboard-configuration',
  templateUrl: './user-dashboard-configuration.component.html',
  styleUrls: ['./user-dashboard-configuration.component.css']
})
export class UserDashboardConfigurationComponent implements OnInit {
  users: User[];
  deptos: Department[] = [];
  userForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private departmentService: DepartmentService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit()  {
    // Obtengo El usuario
    this.userService.getById(1).subscribe(data => {
      this.users = data;
    },(error) => {
      console.log(error);
      this.alertService.error('Error al obtener el usuario', false);
    });
  
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      career: ['', Validators.required],
      department: ['', Validators.required]
    });

    this.departmentService.getAll().subscribe(data => {
      this.deptos = data;
    }, (error) => {
      console.log(error);
      this.alertService.error('Error al solicitar los departamentos', false);
      // alert('Ocurrio un error al solicitar los departamentos');
    });
  
  }

  private f(key: string) { return this.userForm.controls[key]; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.store(this.userForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Publicación creada', true);
          // alert('Publicación creada')
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error('Error al guardad la publicación');
          console.log(error);
          // alert('Ocurrio un error al guardar la publicación');
          this.loading = false;
        });
  }



}
