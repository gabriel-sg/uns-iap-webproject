import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, from } from "rxjs";
import { map, first } from "rxjs/operators";

import { User } from "app/models";
import { environment } from "environments/environment";
import { AuthService, GoogleLoginProvider } from "ng-dynami-social-login";
import { UserService } from "./user.service";

@Injectable({ providedIn: "root" })

export class AuthenticationService {
  apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private socialAuthService: AuthService,
    private userService: UserService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  async login(socialPlatform: string) {

    let socialPlatformProvider;
    let userInfo;
    if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    // else if (socialPlatform == "facebook") {
    //   socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // } else if (socialPlatform == "linkedin") {
    //   socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    // }

    let res = await this.socialAuthService.signIn(socialPlatformProvider).then(userData => {
      // console.log(userData);
      userInfo = userData;
      // Authenticate user in backend
    });

    console.log({id_token: userInfo.idToken});
    return this.http.post<User>(this.apiUrl + "/users/login",  {id_token: userInfo.idToken}).pipe(
      map(user => {
        if (user) {
          // store user details in local storage to keep user logged in between page refreshes
          // console.log(user);
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }
      })
    ).toPromise();
  }

  logout() {
    // remove user from local storage to log user out
    this.userService.logout(this.currentUserSubject.value);
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.socialAuthService.signOut()
      // .then( data => {alert('log out!')})
      .catch( error => {alert('Error: intentaste salir sin haber iniciado sesion?')});

  }
}
