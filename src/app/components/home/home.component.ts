import { Component, ElementRef, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { TvService } from 'src/app/service/tv.service';
import { delay } from 'rxjs/internal/operators/delay';
import { concat } from 'rxjs';
import { Carousel } from 'primeng/carousel';

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
    private tv: TvService,public el:ElementRef,
    public zone: NgZone
    ) {
    // super(el,zone);
    Carousel.prototype.onTouchMove = () => { }
    Carousel.prototype.changePageOnTouch = (e,diff) => {} 
    Carousel.prototype.onDotClick=()=>{}
    Carousel.prototype.onTouchStart=()=>{}
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
        
      }
    ];
  }
  ngOnInit() {
 
      // this.trendingMovies(2);
      this.trendingMovies(1);
    this.tvShow(1);
    // this.tvShow(2);
  }

  trendingMovies(page: number) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;

    
    let temp:any;
    this.movies.getDiscoverMovie(page,"release_date.desc",false,false,"hi%7Cmr","",formattedDate).subscribe((res:any)=>{
      this.nowPlaying=res.results;
      // this.nowPlaying=this.nowPlaying.concat(res.results);
      this.loader=false;
    })
  }

  tvShow(page: number) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
  
    this.tv.getDiscoverTVShow(page,"first_air_date.desc","hi%7Cmr","",formattedDate).subscribe((res:any)=>{
      this.tvShows=res.results;
      // this.tvShows=this.tvShows.concat(res.results);

      this.loader=false;
      
    })
  }
}
