import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminTVService } from 'src/app/service/admin-tv.service';
import { DownloadReqService } from 'src/app/service/admin-downloadReq.service';
import { MoviesService } from 'src/app/service/movies.service';
import { TvService } from 'src/app/service/tv.service';
import { AdminMovieService } from 'src/app/service/admin-movie.service';

@Component({
  selector: 'app-admin-downloadRequest',
  templateUrl: './admin-downloadRequest.component.html',
  styleUrls: ['./admin-downloadRequest.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AdminDownloadRequestComponent implements OnInit {

  requests: any[] = [];
  totalResults: number = 0;
  loader: boolean = false;
  pageNo: number = 1;
  movie: any;
  selectedGenre: any[];
  selectedMovie:any;
  spinnerActive: boolean;


  constructor(
    private downloadReqService: DownloadReqService,
    private adminTvService: AdminTVService,
    private adminMovieService: AdminMovieService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private movieService: MoviesService,
    private tvService: TvService
  ) { }

  ngOnInit() {
    this.getDownloadRequest(1);
  }

  getDownloadRequest(page: number) {
    this.downloadReqService.getDownloadRequest(page).subscribe((res: any) => {
      this.requests = this.requests.concat(res.result);
      this.totalResults = res.total_results;
      if(res.result!=0){
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'New Records Added.' })
      }else{
        this.messageService.add({ severity: 'error', summary: 'Success', detail: 'All Records are already Added.' })
      }
    }, (error: any) => {

      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed To get Records' })
    })
  }

  onRowEditInit(request: any) {

  }
  onRequestDelete(id: number, index: number) {


    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.downloadReqService.deleteDownloadRequest(id).subscribe((data: any) => {
          this.requests.splice(index, 1);
          this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Request is Deleted' })
        }, (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Delete Request ' });
        })
      }, reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have cancel ' });
      }
    })
  }


  addMovieDisplay: boolean = false;

  showAddMovieDialog(id: string, media_type: string) {
    this.addMovieDisplay = true;
    this.selectedGenre = [];

    if (media_type == 'movie') {
      this.movieService.getMovie(id).subscribe(res => {
        this.movie = res;
        this.movie.media_type = media_type;
        this.movie.genres.forEach((element: any) => {
          this.selectedGenre.push(element.id);
        });
      });
    } 
    if (media_type == 'tv') {
      this.tvService.getTVShow(id).subscribe(res => {
        this.movie = res;
        this.movie.media_type = media_type;
        this.movie.genres.forEach((element: any) => {
          this.selectedGenre.push(element.id);
         
        });
      });
    }
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


  addDownloadDisplay: boolean = false;
  showAddDownloadDialog() {
    this.addDownloadDisplay = true;
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
}