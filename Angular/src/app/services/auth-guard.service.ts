import { Injectable } from '@angular/core';
// import * as $ from 'jquery';
// import * as bootstrap from 'bootstrap';


import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import {AuthenticationService, AlertService } from 'app/services';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {
          // authorised so return true
          return true;
      }

      // not logged in so redirect to login page with the return url
      // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});

      $("#logInModal").modal('toggle');
      this.router.navigate(['.'], { queryParams: { returnUrl: state.url }});
      // this.alertService.error('Primero debes iniciar sesión');
      return false;
  }
}
