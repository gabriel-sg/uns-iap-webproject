import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { DepartmentService, PublicationService, AlertService } from 'app/services';
import { Department, Publication, Photo } from 'app/models'

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.css']
})

export class PublicationFormComponent implements OnInit {
  selectedFile: File =null;
  deptos: Department[] = [];
  publication: Publication = new Publication();
  //photo: Photo = new Photo();

  publicationForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private departmentService: DepartmentService,
    private publicationService: PublicationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) { }



  ngOnInit() {
    this.publicationForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      department: ['', Validators.required],
      category: ['', Validators.required]
    });

    // TODO: ver como manejar los mensajes de error. Capaz conviene que lo haga el servicio.
    this.departmentService.getAll().subscribe(data => {
      this.deptos = data;
    }, (error) => {
      console.log(error);
      this.alertService.error('Error al solicitar los departamentos', false);
    });
  }


  // convenience getter for easy access to form fields
  private f(key: string) { return this.publicationForm.controls[key]; }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    console.log(event);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.publicationForm.invalid) {
      return;
    }
    console.log(this.publicationForm.value);
    this.loading = true;
    this.publicationService.store(this.publicationForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Publicación creada', true);
          // alert('Publicación creada')
          this.publication = data;
          //this.router.navigate(['/']);
          const fd = new FormData();
          fd.append('filename',this.selectedFile,this.selectedFile.name);
          fd.append('publi_id',this.publication.id.toString());
          this.publicationService.uploadPhoto(fd)
            .pipe(first())
            .subscribe(
              data => {
                this.alertService.success('Foto cargada', true);
                console.log(data);
                this.router.navigate(['/']);
              },
              error => {
                this.alertService.error('Error al guardad la foto');
                console.log(error);
                this.loading = false;
              });
          
        },
        error => {
          this.alertService.error('Error al guardad la publicación');
          console.log(error);
          // alert('Ocurrio un error al guardar la publicación');
          this.loading = false;
        });
     
  }

}
