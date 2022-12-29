import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { TvService } from 'src/app/service/tv.service';
import { delay } from 'rxjs/internal/operators/delay';
import { concat } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  nowPlaying: any=[];
  tvShows: any=[];
  both:any;
  responsiveOptions;
  loader = true;

  constructor(
    private movies: MoviesService,
    private tv: TvService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 6,
        numScroll: 1,
        showIndicators:false,
        showNavigators:false
      },
      {
        breakpoint: '768px',
        numVisible: 4,
        numScroll: 1
      },
      {
        breakpoint: '560px',
        numVisible: 3,
        numScroll: 1,
        showIndicators:false,
        showNavigators:false
      }
    ];
  }
  ngOnInit() {
 
      this.trendingMovies(2);
      this.trendingMovies(1);
    this.tvShow(1);
    this.tvShow(2);
  }

  trendingMovies(page: number) {
    // this.movies.getNowPlaying(page).pipe(delay(2000)).subscribe((res: any) => {
    //   this.nowPlaying = res.results;
    //   this.loader = false;
    //   console.log(this.nowPlaying);
      
    // });
    let temp:any;
    this.movies.getDiscoverMovie(page,"release_date.desc",true,false,"hi%7Cmr").subscribe((res:any)=>{
      this.nowPlaying=this.nowPlaying.concat(res.results);
      this.loader=false;
      console.log(this.nowPlaying);
      
    })
  }

  tvShow(page: number) {
    // this.tv.getTvOnTheAir(page).pipe(delay(2000)).subscribe((res: any) => {
    //   this.tvShows = res.results;
    //   this.loader = false;
    //  console.log(this.tvShows);
     
    // });
    this.tv.getDiscoverTVShow(page,"first_air_date.desc","hi%7Cmr",2022).subscribe((res:any)=>{
      this.tvShows=this.tvShows.concat(res.results);

      this.loader=false;
      console.log(this.tvShows);
      
    })
  }
}
