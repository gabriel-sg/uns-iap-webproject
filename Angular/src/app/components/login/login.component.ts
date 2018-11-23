import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

  public socialSignIn(socialPlatform: string) {
    this.auth.login(socialPlatform);
    let socialPlatformProvider;

  }

  // onMySignIn(googleUser) {
  //   // Useful data for your client-side scripts:
  //   var profile = googleUser.getBasicProfile();
  //   console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  //   console.log('Full Name: ' + profile.getName());
  //   console.log('Given Name: ' + profile.getGivenName());
  //   console.log('Family Name: ' + profile.getFamilyName());
  //   console.log("Image URL: " + profile.getImageUrl());
  //   console.log("Email: " + profile.getEmail());
  //   console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaah");
  //   // The ID token you need to pass to your backend:
  //   var id_token = googleUser.getAuthResponse().id_token;
  //   console.log("ID Token: " + id_token);
  // }
}

