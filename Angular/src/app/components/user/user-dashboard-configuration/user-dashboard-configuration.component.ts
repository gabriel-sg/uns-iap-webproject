import { Component, OnInit } from '@angular/core';

//import { Publication } from 'app/models';
import { User } from 'app/models';
import { UserService, AlertService } from 'app/services';

@Component({
  selector: 'app-user-dashboard-configuration',
  templateUrl: './user-dashboard-configuration.component.html',
  styleUrls: ['./user-dashboard-configuration.component.css']
})
export class UserDashboardConfigurationComponent implements OnInit {
  users: User[];
  constructor(
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit()  {
    // Obtengo todas las solicitudes
    this.userService.getById(1).subscribe(data => {
      this.users = data;
    },(error) => {
      console.log(error);
      this.alertService.error('Error al obtener el usuario', false);
    });
  }

  

  
  }




