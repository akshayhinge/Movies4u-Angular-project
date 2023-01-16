import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { ActivatedRoute , Params} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { AppMovieDialogComponent } from '../movie-details/app-movie-dialog/app-movie-dialog.component';
import { delay } from 'rxjs/internal/operators/delay';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  public id: number;
  public video: boolean;
  movie: any;
  baseUrl = 'https://www.youtube.com/embed/';
  autoplay = '?rel=0;&autoplay=1&mute=0';
  relatedvideo: any;
  // casts: any = [];
  backdrops: any = [];
  recomendMovies: any;
  responsiveOptions;
  downloads:any[]=[];
  comments:any[]=[];

  constructor(
    private movieService: MoviesService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private admin:AdminService
  ) {
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
      this.getSingleMoviesVideos(this.id);
      this.getSingleMoviesDetails(this.id);
      this.getMovieComments(this.id);
      // this.getCast(this.id);
      this.getBackropsImages(this.id);
      // this.getRecomendMovie(this.id);
      this.getSimilerMovies(this.id);
      this.getDownloadLinks(this.id);

    });
  }

  getSingleMoviesDetails(id){
    this.movieService.getMovie(id).subscribe((res: any) => {
      this.movie = res;
      console.log(this.movie);
      
    });
  }
  getMovieComments(id:any){

    this.admin.getMovieCommentBymovieID(id).subscribe((e:any)=>{
      console.log(e);
      this.comments=e;
      
    })
  }

  onCommentFormSubmit(commentForm:any){
    commentForm.date=new Date();
    if(!commentForm.username){
      commentForm.username="UNKNOWN";
    }

    

    console.log(commentForm.date);
    
    this.admin.addMovieCommentBymovieID(this.id,commentForm).subscribe(e=>{
      console.log(e);
      
      
    })
    // console.log(commentForm.username);
    // console.log(commentForm);
    
    
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
      data: { video: this.video}
    });
  }
  
  // getCast(id) {
  //   this.movieService.getMovieCredits(id).subscribe((res: any) => {
  //     this.casts = res.cast;
  //   });
  // }

  getBackropsImages(id) {
    this.movieService.getBackdropsImages(id).pipe(delay(2000)).subscribe((res: any) => {
      this.backdrops = res.backdrops;
    });
  }

  getRecomendMovie(id) {
    this.movieService.getRecomendMovies(id).pipe(delay(2000)).subscribe((res: any) => {
      this.recomendMovies = res.results;
      console.log(this.recomendMovies);
      
    });
  }
  getSimilerMovies(id) {
    this.movieService.getSimilerMovies(id).pipe(delay(2000)).subscribe((res: any) => {
      this.recomendMovies = res.results;
      console.log(this.recomendMovies);
      
    });
  }

  getDownloadLinks(id){
    this.admin.getMovieDownloadByMovieID(id).pipe(delay(2000)).subscribe((res:any)=>{
      this.downloads=res;
      console.log(this.downloads);
      stop();
    })
    this.downloads=[];
  }
 
}

