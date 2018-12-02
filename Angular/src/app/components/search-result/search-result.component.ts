import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Search } from 'app/models';
import { SearchService,PublicationService,AlertService } from 'app/services';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  searchResult: Search;

  photos = new Map();

  constructor(
    private alertService: AlertService,
    private publicationService: PublicationService,
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService) { 
      this.router.routeReuseStrategy.shouldReuseRoute= () => false;
    }

  ngOnInit() {
    // this.searchResult=this.searchService.currentSearch;
    // console.log(this.searchResult);
    let queryParam = this.router.parseUrl(this.router.url).queryParams;
    this.searchService.searchPublications(queryParam.busqueda).subscribe(
      data =>{
        console.log(data);
        this.searchResult=data;
        for (let entry of this.searchResult.data) {
          this.publicationService.getPhotos(entry.id).subscribe(data => {
            this.photos.set(entry.id,data[0]);
          },(error) => {
            console.log(error);
            this.alertService.error('Error al obtener las fotos', false);
          });
        }
      },error =>{
        console.log(error);

      }
    );
  }

}
