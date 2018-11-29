import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Search } from 'app/models';
import { SearchService } from 'app/services';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  searchResult: Search;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService) { }

  ngOnInit() {
    this.searchResult=this.searchService.currentSearch;
    console.log(this.searchResult);
  }

}
