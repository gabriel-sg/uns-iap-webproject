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
  selectedFile: File =null;
  deptos: Department[] = [];
  publication: Publication = new Publication();
  currentUser: User;

  //photo: Photo = new Photo();

  publicationForm: FormGroup;
  loading = false;
  submitted = false;
  url:string;

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
      department: ['', Validators.required],
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

  onFileSelected(event){
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
    if(this.selectedFile.size > 2048000){
      this.alertService.error('La imagen no puede tener un tamaño mayor que 2MB');
      this.selectedFile=null;
      return;
    }
    if(this.selectedFile.type.search('image')===-1){ 
      this.alertService.error('Por favor seleccione archivo de tipo imagen (png, jpg, gif, ...)');
      this.selectedFile=null;
      return;
    }

    this.alertService.clear();

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
      this.url = event.target.result;
      }
    reader.readAsDataURL(event.target.files[0]);
    }
    console.log(event);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.publicationForm.invalid) {
      return;
    }
    if(!this.selectedFile){
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
          fd.append('filename',this.selectedFile,this.selectedFile.name);
          fd.append('publi_id',this.publication.id.toString());
          this.publicationService.uploadPhoto(fd)
            .pipe(first())
            .subscribe(
              data => {
                this.alertService.success('Publicación creada', true);
                console.log(data);
                this.router.navigate(['/']);
              },
              error => {
                this.alertService.error('Error al guardar la foto');
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
