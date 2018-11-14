import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { PruebasComponent } from './pruebas/pruebas.component';
import { TestComponent } from './test/test.component';
import { UserDashboardMyRequestsComponent } from './user-dashboard-my-requests/user-dashboard-my-requests.component';
import { UserDashboardMessagesComponent } from './user-dashboard-messages/user-dashboard-messages.component';
import { UserDashboardFavsComponent } from './user-dashboard-favs/user-dashboard-favs.component';
import { UserDashboardHelpComponent } from './user-dashboard-help/user-dashboard-help.component';
import { UserDashboardContactUsComponent } from './user-dashboard-contact-us/user-dashboard-contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RequestFormComponent,
    UserDashboardComponent,
    PruebasComponent,
    TestComponent,
    UserDashboardMyRequestsComponent,
    UserDashboardMessagesComponent,
    UserDashboardFavsComponent,
    UserDashboardHelpComponent,
    UserDashboardContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
