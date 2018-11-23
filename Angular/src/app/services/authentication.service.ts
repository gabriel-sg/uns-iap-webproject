import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, from } from "rxjs";
import { map, first } from "rxjs/operators";

import { User } from "app/models";
import { environment } from "environments/environment";
import { AuthService, GoogleLoginProvider } from "ng-dynami-social-login";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private socialAuthService: AuthService
  ) {
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
      console.log(userData);
      userInfo = userData;
      // Authenticate user in backend
    });


    // let observable = from(this.socialAuthService.signIn(socialPlatformProvider));
    // Promise.resolve();

    // return observable.pipe(
    //   map(userData => {
    //     console.log(userData);
    //     token = userData.idToken;
    //     // Authenticate user in backend
    //     return this.http.post<any>(this.apiUrl + "/users/authenticate", token ).pipe(
    //       // map(user => {
    //       //   if (user && user.isLoggedIn) {
    //       //     // store user details in local storage to keep user logged in between page refreshes
    //       //     localStorage.setItem("currentUser", JSON.stringify(user));
    //       //     this.currentUserSubject.next(user);
    //       //   } else {
    //       //     alert("user.isLoggedIn = false");
    //       //   }
    //       //   return user;
    //       // })
    //     ).subscribe();
    //   }
    //   )).subscribe(d=>{alert('exito!')},e=>{alert('Error')});

    return this.http.post<any>(this.apiUrl + "/departments",  userInfo ).pipe(
      map(user => {
        console.log(user);
        if (user) {
          // store user details in local storage to keep user logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
        } else {
          alert("user.isLoggedIn = false");
        }
        return user;
      })
    ).toPromise();
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.socialAuthService.signOut();
  }
}
