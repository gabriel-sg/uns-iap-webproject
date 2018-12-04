import { Component, OnInit } from '@angular/core';
import { Department, User } from 'app/models';
import { DepartmentService, UserService, AlertService, AuthenticationService } from 'app/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-user-dashboard-configuration',
  templateUrl: './user-dashboard-configuration.component.html',
  styleUrls: ['./user-dashboard-configuration.component.css']
})
export class UserDashboardConfigurationComponent implements OnInit {
  currentUser: User;
  deptos: Department[] = [];
  userForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private departmentService: DepartmentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit()  {
    // Obtengo El usuario
    this.currentUser = this.authenticationService.currentUserValue;

    this.userForm = this.formBuilder.group({
      // name: ['', Validators.required],
      // email: ['', Validators.required],
      phone: [this.currentUser.phone, Validators.required],
      career: [this.currentUser.career, Validators.required],
      department: [this.currentUser.department, Validators.required],
      id: [this.currentUser.id]
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
    this.userService.update(this.userForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Datos actualizados');
          // alert('Publicación creada')
          // this.router.navigate(['/mi-cuenta']);
          this.loading = false;
        },
        error => {
          this.alertService.error('No se pudieron actualizar los datos');
          console.log(error);
          // alert('Ocurrio un error al guardar la publicación');
          this.loading = false;
        });
  }



}
