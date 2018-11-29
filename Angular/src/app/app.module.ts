import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import {
  HomeComponent,
  RequestFormComponent,
  PruebasComponent,
  TestComponent,
  AlertComponent,
  // User components
  UserDashboardComponent,
  UserDashboardMyRequestsComponent,
  UserDashboardMessagesComponent,
  UserDashboardFavsComponent,
  UserDashboardHelpComponent,
  UserDashboardContactUsComponent,
  PublicationFormComponent
} from 'app/components';

// Log in module
// https://www.npmjs.com/package/ng-dynami-social-login
import { DynamiSocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'ng-dynami-social-login';
import { LoginComponent } from './components/login/login.component';
import { UserDashboardMyPublicationsComponent } from './components/user/user-dashboard-my-publications/user-dashboard-my-publications.component';
import { UserDashboardConfigurationComponent } from './components/user/user-dashboard-configuration/user-dashboard-configuration.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("1098324426333-gog6d9e0qcnog9i5lbicu1sokj6b5ah2.apps.googleusercontent.com")
      },
      // {
      //   id: FacebookLoginProvider.PROVIDER_ID,
      //   provider: new FacebookLoginProvider("XXXXXX")
      // },
      // {
      //   id: LinkedinLoginProvider.PROVIDER_ID,
      //   provider: new LinkedinLoginProvider("XXXXXXXxXX")
      // }
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RequestFormComponent,
    UserDashboardComponent,
    PruebasComponent,
    TestComponent,
    AlertComponent,
    UserDashboardMyRequestsComponent,
    UserDashboardMessagesComponent,
    UserDashboardFavsComponent,
    UserDashboardHelpComponent,
    UserDashboardContactUsComponent,
    PublicationFormComponent,
    LoginComponent,
    UserDashboardMyPublicationsComponent,
    UserDashboardConfigurationComponent,
    NewUserComponent,
    NavbarComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DynamiSocialLoginModule
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
