import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import {
  HomeComponent,
  RequestFormComponent,
  TestComponent,
  PublicationFormComponent,
  NewUserComponent,
  // User components
  UserDashboardComponent,
  UserDashboardMyRequestsComponent,
  UserDashboardMessagesComponent,
  UserDashboardFavsComponent,
  UserDashboardHelpComponent,
  UserDashboardContactUsComponent,
  UserDashboardMyPublicationsComponent,
  LoginComponent,
  SearchResultComponent
} from 'app/components';

import { AuthGuardService } from './services/auth-guard.service';
import { UserDashboardConfigurationComponent } from './components/user/user-dashboard-configuration/user-dashboard-configuration.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'crearsolicitud', component: RequestFormComponent, canActivate:[AuthGuardService] },
  { path: 'nueva-publicacion', component: PublicationFormComponent, canActivate:[AuthGuardService] },
  // { path: 'login', component: LoginComponent},
  { path: 'test', component: TestComponent },
  { path: 'nuevo-usuario', component: NewUserComponent },
  { path: 'search-result', component: SearchResultComponent },

  { path: 'mi-cuenta', component: UserDashboardComponent, canActivate:[AuthGuardService],
  children: [
      { path: '', component: UserDashboardMyPublicationsComponent },
      { path: 'mis-publicaciones', component: UserDashboardMyPublicationsComponent },
      { path: 'mis-solicitudes', component: UserDashboardMyRequestsComponent },
      { path: 'mensajes', component: UserDashboardMessagesComponent },
      { path: 'favoritos', component: UserDashboardFavsComponent },
      { path: 'ayuda', component:  UserDashboardHelpComponent },
      { path: 'contactenos', component: UserDashboardContactUsComponent },
      { path: 'configuracion', component: UserDashboardConfigurationComponent },


    ]},

  // otherwise redirect to home
  // TODO: redirect to 404 not found page
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
