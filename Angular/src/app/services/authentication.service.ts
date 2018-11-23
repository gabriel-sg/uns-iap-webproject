import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { User } from "app/models";
import { environment } from "environments/environment";
import { AuthService, GoogleLoginProvider } from 'ng-dynami-social-login';

@Injectable({ providedIn: "root" })

export class AuthenticationService {
  apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private socialAuthService: AuthService) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // login(username: string, password: string) {
  //   return this.http
  //     .post<any>(this.apiUrl+'/users/authenticate', { username, password })
  //     .pipe(
  //       map(user => {
  //         // login successful if there's a jwt token in the response
  //         if (user && user.token) {
  //           // store user details and jwt token in local storage to keep user logged in between page refreshes
  //           localStorage.setItem("currentUser", JSON.stringify(user));
  //           this.currentUserSubject.next(user);
  //         }

  //         return user;
  //       })
  //     );
  // }
  login(socialPlatform: string) {
    let socialPlatformProvider;
    let token;
    if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    // else if (socialPlatform == "facebook") {
    //   socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // } else if (socialPlatform == "linkedin") {
    //   socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    // }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(userData);
        token = userData.idToken;
      }
    );

    // Authenticate user in backend
    return this.http
      .post<any>(this.apiUrl+'/users/authenticate', {token} )
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.isLoggedIn) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.socialAuthService.signOut();
  }
}
