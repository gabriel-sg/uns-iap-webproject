import { Component,  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';

import { User } from 'app/models';
import { AlertService, AuthenticationService } from 'app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  {
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
    ) {

  }

  public socialSignIn(socialPlatform: string) {
    this.authenticationService.login(socialPlatform).then(
      user => {
        // alert('Log in exitoso!');
        if(user){
          if(user.isFirstLogIn){
            this.router.navigate(['/nuevo-usuario']);
          }
          else{
            let queryParam = this.router.parseUrl(this.router.url).queryParams;
            // console.log(queryParam);
            if(this.isEmpty(queryParam)){
              this.router.navigate(['/mi-cuenta']);
            }else{
              this.router.navigate([queryParam.returnUrl]);
            }
          }
        }
        else{ // El backend no puedo autenticar al usuario
          this.alertService.error('Uuuups, log in fail');
        }
      },
      error => {
        alert('log in fail');
        console.log(error);
      }
    );

  }


  private isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }
}



