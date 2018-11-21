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
  UserDashboardMyPublicationsComponent,
  LoginComponent
} from 'app/components';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'crearsolicitud', component: RequestFormComponent },
  { path: 'nueva-publicacion', component: PublicationFormComponent },
  { path: 'login', component: LoginComponent},
  { path: 'test', component: TestComponent },

  { path: 'mi-cuenta', component: UserDashboardComponent,
  children: [
      { path: 'mis-publicaciones', component: UserDashboardMyPublicationsComponent },
      { path: 'mis-solicitudes', component: UserDashboardMyRequestsComponent },
      { path: 'mensajes', component: UserDashboardMessagesComponent },
      { path: 'favoritos', component: UserDashboardFavsComponent },
      { path: 'ayuda', component:  UserDashboardHelpComponent },
      { path: 'contactenos', component: UserDashboardContactUsComponent },
     
    ]},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
