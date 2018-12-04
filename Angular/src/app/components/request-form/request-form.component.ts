import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { DepartmentService, RequestService, AlertService, AuthenticationService } from 'app/services';
import { Department, Request, User } from 'app/models'

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})

export class RequestFormComponent implements OnInit {
  deptos: Department[] = [];
  request: Request = new Request();
  currentUser: User;


  requestForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private departmentService: DepartmentService,
    private requestService: RequestService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService

  ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;

    this.requestForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      department: ['', Validators.required],
      category: ['', Validators.required],
      user_id: [this.currentUser.id]
    });

    // TODO: redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }

    // TODO: ver como manejar los mensajes de error. Capaz conviene que lo haga el servicio.
    this.departmentService.getAll().subscribe(data => {
      this.deptos = data;
    }, (error) => {
      console.log(error);
      this.alertService.error('Error al solicitar los departamentos', false);
      // alert('Ocurrio un error al solicitar los departamentos');
    });
  }

  // convenience getter for easy access to form fields
  private f(key: string) { return this.requestForm.controls[key]; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.requestForm.invalid) {
      return;
    }

    this.loading = true;
    this.requestService.store(this.requestForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Solicitud creada', true);
          // alert('Solicitud creada')
          this.router.navigate(['/mi-cuenta/mis-solicitudes']);
        },
        error => {
          this.alertService.error('Error al guardad la solicitud');
          console.log(error);
          // alert('Ocurrio un error al guardar la solicitud');
          this.loading = false;
        });
  }

}
