import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DownloadReqService } from 'src/app/service/admin-downloadReq.service';
import { Movie } from 'src/app/service/Movie';
import { MoviesService } from 'src/app/service/movies.service';
import {ConfirmationService,  MessageService} from 'primeng/api';
import { AdminMovieService } from 'src/app/service/admin-movie.service';
import { AdminTVService } from 'src/app/service/admin-tv.service';

interface Genre{
  id:number;
  name:String;
} 

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [ConfirmationService,MessageService]
})



export class AdminComponent implements OnInit {

 
  topRated: any=[];
  responsiveOptions;
  loader = true;
  totalResults: any;
  total_results: any;
  searchRes: any;
  searchStr: string;
  movie:any;
  genrename : Genre[];
  selectedGenre : any[]=[];
  selectedMovie:Movie ;
  selectedMovieID:number=0;
  addGenreDisplay:boolean=false;
  spinnerActive=false;
  totalSearchResults:number;
  searchLoader: boolean;
  constructor(
    private movieService: MoviesService,
    // private downloadReqService:DownloadReqService,
    private adminMovieService:AdminMovieService,
    private adminTvService:AdminTVService,
    private confirmationService:ConfirmationService,
    private messageService:MessageService) {

  }

  ngOnInit() {
    this.getTopRatedMovies(1);
  }
  addMovieDisplay: boolean = false;

  showAddMovieDialog(movie:any,media_type:string) {

      this.addMovieDisplay = true;
      this.movie=movie;
      this.movie.media_type=media_type;
      this.selectedMovie=movie;
      this.selectedMovie.media_type=media_type;
     this.selectedGenre=movie.genre_ids;  
  }
  onMovieSubmit(selectedMovie: any) {
    this.selectedMovie=selectedMovie;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.spinnerActive = true;
        if(selectedMovie.media_type=='movie'){
          this.adminMovieService.addMovieByGenre(this.selectedGenre, selectedMovie).subscribe((res: any) => {
            if (res) {
              this.showAddDownloadDialog();
              this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Movie added Successfully' });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Movie is Already Added' });
            }
            this.spinnerActive = false;
          }, (error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Something went wrong' });
            this.spinnerActive = false;
          })
        }
        if(selectedMovie.media_type=='tv'){
          selectedMovie.tvshowID=selectedMovie.moviesID;
          
          this.adminTvService.addTvShowsByGenre(this.selectedGenre, selectedMovie).subscribe((res: any) => {
            if (res) {
              this.showAddDownloadDialog();
              this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Movie added Successfully' });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Movie is Already Added' });
            }
            this.spinnerActive = false;
          }, (error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Something went wrong' });
            this.spinnerActive = false;
          })
        }

      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }


addDownloadDisplay:boolean=false;
showAddDownloadDialog(){
this.addDownloadDisplay=true;
}
onDownloadSubmit(selectdDownload, id) {
  this.confirmationService.confirm({
    message: 'Are you sure that you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',


    accept: () => {
      this.spinnerActive = true;
      if(this.selectedMovie.media_type=='movie'){
        this.adminMovieService.addMovieDownloadByMovieID(id, selectdDownload.value).subscribe((res: any) => {
          this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Download Links Added Successfully' });
          this.spinnerActive = false;
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Add Links ' });
          this.spinnerActive = false;

        });
      }
      if(this.selectedMovie.media_type=='tv'){
        this.adminTvService.addTvShowDownloadByMovieID(id, selectdDownload.value).subscribe((res: any) => {
          this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Download Links Added Successfully' });
          this.spinnerActive = false;
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Add Links ' });
          this.spinnerActive = false;

        });
      }
    },
    reject: () => {
      this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
    }
  });

}


showAddGenreDialog(){
this.addGenreDisplay=true;

}
onGenreSubmit(selectedGenre){
}

  getTopRatedMovies(page: number) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
  

    this.movieService.getDiscoverMovie(page,"popularity.desc",false,true,"hi%7Cmr","",formattedDate).subscribe((res:any)=>{
      this.topRated=res.results;
      this.totalResults = res.total_results;
      this.loader = false;
    })


  }

  changeSearchPage(event:any) {
    this.searchLoader = true;
    this.searchMovies(event.pageIndex + 1);
  }
  changePage(event:any) {
    this.loader = true;
    this.getTopRatedMovies(event.pageIndex + 1);
  }

  searchMovies(page:number) {
    this.movieService.multisearch(page,this.searchStr,false).subscribe((res:any)=>{
      this.searchRes= res.results;
      this.totalSearchResults=res.total_results;
      this.searchLoader=false;
    });
  }
  
  public getmoviesbypage(page:number){
    this.adminMovieService.getMoviesBypage(page).subscribe((res:any)=>{
      this.topRated=res.result;
      this.totalResults = res.total_results;
      this.loader = false;
    })
    
  }
}
