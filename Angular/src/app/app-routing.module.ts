import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import {
  HomeComponent,
  RequestFormComponent,
  TestComponent,
  PublicationFormComponent,
  // User components
  UserDashboardComponent,
  UserDashboardMyRequestsComponent,
  UserDashboardMessagesComponent,
  UserDashboardFavsComponent,
  UserDashboardHelpComponent,
  UserDashboardContactUsComponent,
  LoginComponent
} from 'app/components';

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
  { path: 'nueva-publicacion', component: PublicationFormComponent },
  { path: 'login', component: LoginComponent},
  { path: 'test', component: TestComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
