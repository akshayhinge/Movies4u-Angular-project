import { Component, OnInit } from '@angular/core';
import { TvService } from 'src/app/service/tv.service';
import { delay } from 'rxjs/internal/operators/delay';
import { MoviesService } from 'src/app/service/movies.service';


@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss']
})
export class TvShowsComponent implements OnInit {
  topRatedTv: any;
  responsiveOptions;
  loader = true;
  totalResults: any;
  total_results: any;
  searchRes: any;
  searchStr: string;

  constructor(
    private tvService: TvService,private movieservice:MoviesService
  ) {
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
    this.TopRatedTVShows(1);
  }

  TopRatedTVShows(page: number) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
  
    this.tvService.getDiscoverTVShow(page,"popularity.desc","hi%7Cmr","",formattedDate).subscribe((res:any)=>{
      this.topRatedTv=res.results;
      this.totalResults = res.total_results;
      this.loader = false;
    })
  }

  changePage(event) {
    this.TopRatedTVShows(event.pageIndex + 1);
    this.loader = false;
  }

  searchMovies() {
    this.movieservice.multisearch(1,this.searchStr,true).subscribe(res => {
      this.searchRes = res.results;
    });
  }

}
