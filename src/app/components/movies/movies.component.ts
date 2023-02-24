import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  
 @Input() onlySearchingForm=false;

  topRated: any=[];
  responsiveOptions;
  loader = true;
  totalResults: any;
  total_results: any;
  searchRes: any[]=[];
  searchStr: string;

  totalSearchResults:any;
  searchPaginator=false;
  emptyMessage=false;
  filterArray:String[] =[ "movie","tv"];
  constructor(private movieService: MoviesService) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  ngOnInit() {
    this.getTopRatedMovies(1);

  }


  getTopRatedMovies(page: number) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;

    this.movieService.getDiscoverMovie(page,"popularity.desc",false,false,"hi%7Cmr","",formattedDate).subscribe((res:any)=>{
      this.topRated=res.results;
      this.totalResults = res.total_results;
      this.loader = false;
    })


  }

  changePage(event) {
    this.loader = true;
    this.getTopRatedMovies(event.pageIndex + 1);
  }
  changeSearchPage(event){
    this.searchMovies(event.pageIndex + 1);
  }

  searchMovies(page) {
    this.searchRes=[];
    this.totalSearchResults=0;
    this.movieService.multisearch(page,this.searchStr,false).subscribe((res:any)=>{
      
      res.results.forEach(e=>{
        this.filterArray.forEach(v=>{
          if(e.media_type==v){
            this.searchRes.push(e);
          }
        })
      })
      this.totalSearchResults = res.total_results;
      if(this.totalSearchResults>=20){
        this.searchPaginator=true;
      }
      this.emptyMessage=true;

    });
  }


}
