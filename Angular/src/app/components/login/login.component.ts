import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, from } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from 'app/models';
import { AlertService, AuthenticationService } from 'app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private alertService: AlertService
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/mi-cuenta']);
    }
  }

  ngOnInit() {
  }

  public socialSignIn(socialPlatform: string) {
    let observable = from(this.authenticationService.login(socialPlatform));
    observable
    .pipe(first())
    .subscribe(
        data => {
            this.router.navigate(['/mi-cuenta']);
        },
        error => {
            this.alertService.error('error al logearse');
        });

  }

}

