import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { DepartmentService, PublicationService, AlertService, AuthenticationService } from 'app/services';
import { Department, Publication, Photo, User } from 'app/models'

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.css']
})

export class PublicationFormComponent implements OnInit {
  selectedFiles: FileList = null;
  deptos: Department[] = [];
  publication: Publication = new Publication();
  currentUser: User;

  //photo: Photo = new Photo();

  publicationForm: FormGroup;
  loading = false;
  submitted = false;
  fileError = false;
  fileErrorText: string;
  url: string;
  auxFilesUrl: string[] = [];
  filesUrl: string[];


  constructor(
    private departmentService: DepartmentService,
    private publicationService: PublicationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) { }



  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;

    this.publicationForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      department_id: ['', Validators.required],
      category: ['', Validators.required],
      user_id: [this.currentUser.id]
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


  onFileSelected(event) {
    // console.log(event);
    this.selectedFiles = <FileList>event.target.files;
    if(this.selectedFiles.length > 4){
      this.fileError = true;
      this.fileErrorText = 'Solo se puede subir hasta 4 fotos';
    }
    else{
      Array.from(this.selectedFiles).forEach(file => {
        console.log(file);
        if (file.size > 2048000) {
          this.fileError = true;
          this.fileErrorText = 'Las imagenes no pueden tener un tamaño mayor que 2MB';
          return;
        }
        if (file.type.search('image') === -1) {
          this.fileError = true;
          this.fileErrorText = 'Por favor seleccione archivos de tipo imagen (png, jpg, gif, ...)';
          return;
        }

      });
    }

    if (this.fileError) {
      this.alertService.error(this.fileErrorText);
      this.fileError = false;
      return;
    }
    else {
      this.alertService.clear();
      console.log(event.target);
      if (event.target.files) {
        this.auxFilesUrl = [];
        this.selectedFiles = <FileList>event.target.files;
        Array.from(this.selectedFiles).forEach(file => {
            var reader = new FileReader();
            reader.onload = (event: any) => {
              this.auxFilesUrl.push(event.target.result);
            }
            reader.readAsDataURL(file);
          });
          this.filesUrl = this.auxFilesUrl;
        }
    }

    }

    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.publicationForm.invalid) {
        return;
      }
      if (!this.selectedFiles) {
        this.alertService.error('Por favor seleccionar al menos una foto');
        return;
      }

      console.log(this.publicationForm.value);
      this.loading = true;
      this.publicationService.store(this.publicationForm.value)
        .pipe(first())
        .subscribe(
          data => {

            // alert('Publicación creada')
            this.publication = data;
            //this.router.navigate(['/']);
            const fd = new FormData();
            fd.append('publi_id', this.publication.id.toString());
            for (var i = 0; i < this.selectedFiles.length; i++) {
              fd.append('file' + i, this.selectedFiles[i], this.selectedFiles[i].name);
            }
            console.log(fd);
            this.publicationService.uploadPhoto(fd)
              .pipe(first())
              .subscribe(
                data => {
                  this.alertService.success('Publicación creada', true);
                  console.log(data);
                  this.router.navigate(['/mi-cuenta/mis-publicaciones']);
                },
                error => {
                  this.publicationService.deleteById(this.publication.id).subscribe(
                    success => {
                      // console.log("Exito");
                    }, error => {
                      console.log(error);
                    }
                  )
                  this.alertService.error('Error al guardar las fotos, no se pudo crear la publicacion');
                  console.log(error);
                  this.loading = false;
                });

          },
          error => {
            this.alertService.error('Error al guardar la publicación');
            console.log(error);
            // alert('Ocurrio un error al guardar la publicación');
            this.loading = false;
          });

    }

  }
