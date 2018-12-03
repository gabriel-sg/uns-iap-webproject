import { Component, OnInit } from '@angular/core';

import { AuthService, GoogleLoginProvider } from 'ng-dynami-social-login';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {
  selectedFiles: FileList =null;
  API_ENDPOINT = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }


  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    // else if (socialPlatform == "facebook") {
    //   socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // } else if (socialPlatform == "linkedin") {
    //   socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    // }
    /*
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(userData);
      }
    );
    */
  }

  onMySignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaah");
    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  }

  onFileSelected(event){
    this.selectedFiles = <FileList>event.target.files;
    console.log(event);
  }

  onUpload(){
    const fd = new FormData();
    for(var i = 0; i<this.selectedFiles.length;i++){
      fd.append('file'+i,this.selectedFiles[i],this.selectedFiles[i].name);  
    }
    console.log(fd);
    this.http.post(this.API_ENDPOINT + '/test',fd)
      .subscribe(res => {
        console.log(res);
      });
  }
}
