import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { TvService } from 'src/app/service/tv.service';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  nowPlaying: any=[];
  tvShows: any;
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
    this.trendingMovies(1);
    this.tvShow(1);
  }

  trendingMovies(page: number) {
    this.movies.getNowPlaying(page).pipe(delay(2000)).subscribe((res: any) => {
      // let tem:any= res.results;
      this.nowPlaying = res.results;
      this.loader = false;
      // const result = res.results.find(element => {
      //   return element.original_language.toUpperCase() === "HI";
      // });
      // this.nowPlaying=result;
      
      // tem.forEach(e=>{
      //   if(e.original_language.toLowerCase()=="hi"){
      //     this.nowPlaying.push(e);
      //   }
      // })
      // | filtermovies : 'HI': 'original_language' 
      console.log(this.nowPlaying);
      
    });
  }

  tvShow(page: number) {
    this.tv.getTvOnTheAir(page).pipe(delay(2000)).subscribe((res: any) => {
      this.tvShows = res.results;
      this.loader = false;
      this.both = { ...this.nowPlaying,  ...this.tvShows};
     
    });
  }
}
