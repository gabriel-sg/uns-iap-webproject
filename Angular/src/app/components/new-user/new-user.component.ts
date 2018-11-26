import { Component, OnInit } from '@angular/core';
import { Department,User } from 'app/models'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService, UserService, AlertService } from 'app/services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  deptos: Department[] = [];
  user: User = new User();

  userForm: FormGroup;
  loading = false;
  submitted = false;
  
  constructor(
    private departmentService: DepartmentService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    // private authenticationService: AuthenticationService

  ) { }

  ngOnInit() {
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
    this.userService.update(this.userForm.value,1)
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
