import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchRes: any[]=[];
  searchStr: string;
  totalSearchResults: number;
  searchPaginator: boolean=false;
  emptyMessage: boolean;
  loader:boolean=false;
  
  constructor(
    private movieService:MoviesService
  ) { }
  
  ngOnInit() {
  }
  
  
  
  searchMovies(page:number) {
    this.loader=true;
    this.searchRes=[];
    this.totalSearchResults=0;
    const filterArray:String[] =[ "movie","tv"];
    this.movieService.multisearch(page,this.searchStr,false).subscribe((res:any)=>{
      
      res.results.forEach(e=>{
        filterArray.forEach(v=>{
          if(e.media_type==v){
            this.searchRes.push(e);
          }
        });
      });

      this.totalSearchResults = res.total_results;

      if(this.totalSearchResults>=20){
        this.searchPaginator=true;
      }else{
        this.searchPaginator=false;
      }

      this.emptyMessage=true;
      this.loader=false;
    });
  }

  changeSearchPage(event){
    this.searchMovies(event.pageIndex + 1);
  }
}
