import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { TestComponent } from './test/test.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserDashboardContactUsComponent } from './user-dashboard-contact-us/user-dashboard-contact-us.component';
import { UserDashboardFavsComponent } from './user-dashboard-favs/user-dashboard-favs.component';
import { UserDashboardHelpComponent } from './user-dashboard-help/user-dashboard-help.component';
import { UserDashboardMessagesComponent } from './user-dashboard-messages/user-dashboard-messages.component';
import { UserDashboardMyRequestsComponent } from './user-dashboard-my-requests/user-dashboard-my-requests.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'crearsolicitud', component: RequestFormComponent },
  { path: 'mi-cuenta', component: UserDashboardComponent },
  { path: 'contactenos', component: UserDashboardContactUsComponent },
  { path: 'favoritos', component: UserDashboardFavsComponent },
  { path: 'ayuda', component: UserDashboardHelpComponent },
  { path: 'mensajes', component: UserDashboardMessagesComponent },
  { path: 'mis-solicitudes', component: UserDashboardMyRequestsComponent },
  { path: 'test', component: TestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
