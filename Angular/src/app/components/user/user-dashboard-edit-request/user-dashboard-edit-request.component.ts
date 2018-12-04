import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, tap } from 'rxjs/operators';

import { DepartmentService, PublicationService, AlertService, AuthenticationService } from 'app/services';
import { Department, Publication, Photo, User } from 'app/models'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-dashboard-edit-request',
  templateUrl: './user-dashboard-edit-request.component.html',
  styleUrls: ['./user-dashboard-edit-request.component.css']
})

export class UserDashboardEditRequestComponent implements OnInit {
  selectedFiles: FileList =null;
  deptos: Department[];
  currentPublication: Publication;
  currentPublicationObs: Observable<Publication>;
  currentUser: User;
  publiId = 0;

  //photo: Photo = new Photo();

  publicationForm: FormGroup;
  loadingForm = false;
  submitted = false;
  fileError= false;
  fileErrorText:string;
  url:string;

  constructor(
    private departmentService: DepartmentService,
    private publicationService: PublicationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) {
    this.route.queryParams.subscribe(params => {
      this.publiId = params["id"];
  });

  }


  async ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;

    this.publicationForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      department_id: ['', Validators.required],
      category: ['', Validators.required],
      user_id: [this.currentUser.id],
      visible: [true],
      id: [this.publiId]
    });

    // Get departments and then publication by id
    this.departmentService.getAll().subscribe(data => {
      this.deptos = data;
      this.currentPublicationObs = this.publicationService.getById(this.publiId).pipe(
        tap(publication => {
          this.publicationForm.patchValue(publication[0]);
          // console.log(publication);
          // this.publicationForm.patchValue({department: this.deptos[publication[0].department_id-1].name});
          this.currentPublication = publication[0];
        })
      );
    }, (error) => {
      this.alertService.error('Error al solicitar los departamentos', false);
      console.log(error);
    });

  }


  // convenience getter for easy access to form fields
  private f(key: string) { return this.publicationForm.controls[key]; }

  onFileSelected(event){
    console.log(event);
    this.selectedFiles = <FileList>event.target.files;
    Array.from(this.selectedFiles).forEach(file=> {
      console.log(file);
      if(file.size > 2048000){
        this.fileError=true;
        this.fileErrorText='Las imagenes no pueden tener un tamaño mayor que 2MB';
        return;
      }
      if(file.type.search('image')===-1){
        this.fileError=true;
        this.fileErrorText='Por favor seleccione archivos de tipo imagen (png, jpg, gif, ...)';
        return;
      }
    });

    if(this.fileError){
      this.alertService.error(this.fileErrorText);
      this.fileError=false;
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
    if(!this.selectedFiles){
      this.alertService.error('Por favor seleccionar al menos una foto');
      return;
    }

    console.log(this.publicationForm.value);
    this.loadingForm = true;
    this.publicationService.update(this.publicationForm.value)
      .pipe(first())
      .subscribe(
        success => {

          // alert('Publicación creada')
          // console.log(this.currentPublication);
          //this.router.navigate(['/']);
          const fd = new FormData();
          fd.append('publi_id',this.currentPublication.id.toString());
          for(var i = 0; i<this.selectedFiles.length;i++){
            fd.append('file'+i,this.selectedFiles[i],this.selectedFiles[i].name);
          }
          console.log(fd);
          this.publicationService.uploadPhoto(fd)
            .pipe(first())
            .subscribe(
              data => {
                this.alertService.success('Publicación actualizada', true);
                console.log(data);
                this.router.navigate(['/mi-cuenta/mis-publicaciones']);
              },
              error => {
                this.alertService.error('Error al actualizar las fotos');
                console.log(error);
                this.loadingForm = false;
              });

        },
        error => {
          this.alertService.error('Error al actualizar la publicación');
          console.log(error);
          // alert('Ocurrio un error al guardar la publicación');
          this.loadingForm = false;
        });

  }

}


