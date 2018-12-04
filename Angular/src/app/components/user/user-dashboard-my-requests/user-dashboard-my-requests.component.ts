import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { RequestService, AlertService, AuthenticationService, DepartmentService } from 'app/services';
import { Request, User, Department } from 'app/models';

@Component({
  selector: 'app-user-dashboard-my-requests',
  templateUrl: './user-dashboard-my-requests.component.html',
  styleUrls: ['./user-dashboard-my-requests.component.css']
})
export class UserDashboardMyRequestsComponent implements OnInit, AfterViewInit {
  requests: Request[];
  currentUser: User;
  modify: boolean = false;

  deptos: Department[] = [];
  requestForm: FormGroup;
  loadingForm = false;
  submitted = false;

  constructor(
    private departmentService: DepartmentService,
    private requestService: RequestService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;

    // Obtengo todas las solicitudes con el correspondiente Id de usuario
    this.requestService.getRequests(this.currentUser.id).subscribe(data => {
      this.requests = data;
    }, (error) => {
      console.log(error);
      this.alertService.error('No se pudo obtener las solicitudes', false);
    });
  }

  ngAfterViewInit() {
    this.requestForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      department_id: ['', Validators.required],
      category: ['', Validators.required],
      user_id: [this.currentUser.id],
      id: ['']
    });

    this.departmentService.getAll().subscribe(data => {
      this.deptos = data;
    }, (error) => {
      console.log(error);
      this.alertService.error('No se pudo obtener los departamentos', false);
      // alert('Ocurrio un error al solicitar los departamentos');
    });

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.requestForm.invalid) {
      return;
    }

    this.loadingForm = true;
    this.requestService.update(this.requestForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Solicitud actualizada');
          // alert('Solicitud creada')
          // this.router.navigate(['/mi-cuenta/mis-solicitudes']);
          this.loadingForm = false;
          this.modify = false;
          this.ngOnInit();

        },
        error => {
          this.alertService.error('No se pudo actualizar la solicitud');
          console.log(error);
          // alert('Ocurrio un error al guardar la solicitud');
          this.loadingForm = false;
        });
  }


  private modificar(request: Request) {
    // this.publicationService.auxPublication = publication;
    // this.router.navigate(['/mi-cuenta/edit-publication'], { queryParams: { id: publicationId }});
    this.requestForm.patchValue(request);
    this.alertService.clear();
    this.modify = true;
  }

  private eliminar(requestId: number) {
    this.requestService.deleteById(requestId).subscribe(
      success => {
        this.ngOnInit();
        this.alertService.success("Solicitud eliminada.");
      }, error => {
        this.alertService.error("No se pudo eliminar la solicitud.");
      }
    );
  }

  private f(key: string) { return this.requestForm.controls[key]; }


}

