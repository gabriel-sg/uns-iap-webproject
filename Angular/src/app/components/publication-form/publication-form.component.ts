import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { DepartmentService, PublicationService, AlertService } from 'app/services';
import { Department, Publication } from 'app/models'

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.css']
})

export class PublicationFormComponent implements OnInit {
  deptos: Department[] = [];
  publication: Publication = new Publication();

  publicationForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private departmentService: DepartmentService,
    private publicationService: PublicationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService
    ) {  }



    ngOnInit() {
      this.publicationForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        department: ['', Validators.required],
        category: ['', Validators.required]
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
        this.alertService.error('Error al solicitar los departamentos', true);
        // alert('Ocurrio un error al solicitar los departamentos');
      });
    }


     // convenience getter for easy access to form fields
    private f(key: string) { return this.publicationForm.controls[key]; }

    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.publicationForm.invalid) {
        return;
      }

      this.loading = true;
      this.publicationService.store(this.publicationForm.value)
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
