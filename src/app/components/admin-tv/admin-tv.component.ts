import { Component, OnInit } from '@angular/core';
import { DownloadReqService } from 'src/app/service/admin-downloadReq.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminMovieService } from 'src/app/service/admin-movie.service';
import { AdminTVService } from 'src/app/service/admin-tv.service';

@Component({
  selector: 'app-admin-tv',
  templateUrl: './admin-tv.component.html',
  styleUrls: ['./admin-tv.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AdmintvComponent implements OnInit {

  tv: any[] = [];
  totalResults: number = 0;
  loader: boolean = false;
  first: number = 1;
  rows = 20;
  displayDownloadDialog = false;
  tvshowID = 0;
  pageNo = 1;
  download: any[] = [];
  comments: any[] = [];

  showdownloads = false;
  showComments = false;
  constructor(
    private downloadReqService: DownloadReqService, 
    private adminTVService:AdminTVService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
    ) { }

  ngOnInit() {
    this.getSystemTVshow(1);
  }

  getSystemTVshow(page: number) {

    this.adminTVService.getTvShowsBypage(page).subscribe((res: any) => {
      this.tv = this.tv.concat(res.result);
      
      this.pageNo = res.page;
      this.totalResults = res.total_results;
  
      if(res.result!=0){
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'New Records Added.' })
      }else{
        this.messageService.add({ severity: 'error', summary: 'Success', detail: 'All Records are already Added.' })
      }
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed To get Records' })
    })
    this.loader = false;
  }


  onMovieRowEditSave(movie: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminTVService.updateTvShowByid(movie.id, movie).subscribe((e: any) => {
          if (e) {
            this.messageService.add({ severity: 'info', summary: 'Deleted', detail: 'Movie Updated Successfully' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Updated Movie ' });

          }

        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Updated Movie ' });

        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
  onDownloadRowEditSave(id: number, download: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminTVService.updateTvShowDownloadByID(id, download).subscribe((e) => {
          if (e) {
            this.messageService.add({ severity: 'info', summary: 'Deleted', detail: 'Movie Download Updated Successfully' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Updated Movie Download' });

          }

        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Updated Movie Download' });

        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

  openDownloadDialog(id: number) {
    this.tvshowID = id;
    this.displayDownloadDialog = true;
  }
  onDownloadSubmit(download: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.adminTVService.addTvShowDownloadByMovieID(this.tvshowID, download).subscribe((e: any) => {
            if (e) {
              this.messageService.add({ severity: 'info', summary: 'Deleted', detail: 'Download Added  Successfully' });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Add Download ' });
  
            }
  
          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Add Download ' });
  
          });
        },
        reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        }
      });

  }

  onshowComments() {
    this.showComments = !this.showComments;
  }
  onshowDownloads() {
    this.showdownloads = !this.showdownloads;
  }

  onMovieDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminTVService.deleteTvShowByid(id).subscribe((e: any) => {
          if (e) {
            this.messageService.add({ severity: 'info', summary: 'Deleted', detail: 'Download Deleted Success' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Delete Download ' });

          }

        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Delete Download ' });

        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
  ondeleteSelectedComment(id: number, index: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminTVService.deleteCommentByid(id).subscribe((e: any) => {
          if (e) {
            this.comments.splice(index, 1);
            this.messageService.add({ severity: 'info', summary: 'Deleted', detail: 'Comment Deleted Successfully' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Delete Comment ' });

          }

        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Delete Comment ' });

        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
  deleteSelectedDownload(id: number, index: number){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminTVService.deleteTvShowDownloadByID(id).subscribe((e: any) => {
          if (e) {
            this.messageService.add({ severity: 'info', summary: 'Deleted', detail: 'Download Deleted Successfully' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Delete Download ' });

          }

        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Delete Download ' });

        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }
}
