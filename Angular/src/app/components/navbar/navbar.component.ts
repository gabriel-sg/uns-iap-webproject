import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, AlertService, SearchService } from 'app/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, Search } from 'app/models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: User;
  searchForm: FormGroup;
  search: Search;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private searchService: SearchService,
    private alertService: AlertService
    ) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    });
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  onSubmit(){
    // this.searchService.searchPublications(this.searchForm.value.search)
    // /*.pipe(first())
    // .subscribe(
    //   data=> {
    //     this.search=data;
    //     console.log(data);
    //     this.router.navigate(['/search-result'], { queryParams: { busqueda: this.search }});
    //   },
    //   error => {
    //     console.log(error);
    //   })*/;
    // this.router.navigate(['/search-result']);
    
    if(this.searchForm.value.search.trim()){
           this.router.navigate(['/search-result'], { queryParams: { busqueda: this.searchForm.value.search }});
    }

  }
}
