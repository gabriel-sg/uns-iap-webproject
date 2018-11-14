import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { PruebasComponent } from './components/pruebas/pruebas.component';
import { TestComponent } from './components/test/test.component';
import { AlertComponent } from './components/alert/alert.component';

import { DynamiSocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'ng-dynami-social-login';

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
    AlertComponent
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
