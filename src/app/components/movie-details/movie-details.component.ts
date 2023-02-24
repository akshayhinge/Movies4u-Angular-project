import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { AppMovieDialogComponent } from '../movie-details/app-movie-dialog/app-movie-dialog.component';
import { delay } from 'rxjs/internal/operators/delay';
import { DownloadReqService } from 'src/app/service/admin-downloadReq.service';
import { MessageService } from 'primeng/api';
import { AdminMovieService } from 'src/app/service/admin-movie.service';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  providers: [MessageService]
})
export class MovieDetailsComponent implements OnInit {

  public id: number;
  public video: boolean;
  movie: any;
  baseUrl = 'https://www.youtube.com/embed/';
  embedUrl = "https://autoembed.to/movie/tmdb/"
  autoplay = '?rel=0;&autoplay=1&mute=0';
  relatedvideo: any;
  // casts: any = [];
  backdrops: any = [];
  recomendMovies: any;
  responsiveOptions;
  downloads: any[] = [];
  comments: any[] = [];
  commentForm: any;
  movieid: number;
  constructor(
    private movieService: MoviesService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private adminMovie: AdminMovieService,

  ) {
    Carousel.prototype.changePageOnTouch = (e,diff) => {} 
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 6,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 6,
        numScroll: 1
      },
      {
        breakpoint: '560px',
        numVisible: 4,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getSingleMoviesDetails(this.id);
      this.getDownloadLinks(this.id);
      this.getSingleMoviesVideos(this.id);
      this.getBackropsImages(this.id);
      // this.getSimilerMovies(this.id);
      this.getRecomendMovie(this.id);


    });
  }

  getSingleMoviesDetails(id) {
    this.movieService.getMovie(id).subscribe((res: any) => {
      this.movie = res;

    });
  }



  getSingleMoviesVideos(id) {
    this.movieService.getMovieVideos(id).pipe(delay(2000)).subscribe((res: any) => {
      if (res.results.length) {
        this.video = res.results[0];
        this.relatedvideo = res.results;
      }
    });
  }

  openDialogMovie(video): void {
    this.video['url'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + video.key + this.autoplay);
    this.dialog.open(AppMovieDialogComponent, {
      height: '600px',
      width: '900px',
      data: { video: this.video }
    });
  }
  openDialogWatch(): void {


    this.video['url'] = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.embedUrl}${this.id}`);
    // `https://www.2embed.to/embed/tmdb/movie?id=${this.id}`);
    this.dialog.open(AppMovieDialogComponent, {
      height: '600px',
      width: '990px',
      data: { video: this.video }
    });
  }


  getBackropsImages(id) {
    this.movieService.getBackdropsImages(id).pipe(delay(1000)).subscribe((res: any) => {
      this.backdrops = res.backdrops;
    });
  }

  getRecomendMovie(id) {
    this.movieService.getRecomendMovies(id).pipe(delay(2000)).subscribe((res: any) => {
      this.recomendMovies = res.results;
    });
  }
  getSimilerMovies(id) {
    this.movieService.getSimilerMovies(id).pipe(delay(2000)).subscribe((res: any) => {
      this.recomendMovies = res.results;
    });
  }

  getDownloadLinks(id) {
    this.adminMovie.getMovieDownloadByMovieID(id).subscribe((res: any) => {
      this.downloads = res;
      stop();
    })
    this.downloads = [];
  }

}

