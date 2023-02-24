import { Component, Input, OnInit } from '@angular/core';
import {  DownloadReqService} from 'src/app/service/admin-downloadReq.service';
import { MessageService } from 'primeng/api'
@Component({
  selector: 'app-download-request',
  templateUrl: './download-request.component.html',
  styleUrls: ['./download-request.component.scss'],
  providers: [MessageService]
})
export class DownloadRequestComponent implements OnInit {
  @Input() movieID: String = '';
  @Input() movieName: String = '';
  @Input() mediaType: String = '';

  constructor(
    private downloadReqService: DownloadReqService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  onRequestFormSubmit(requestForm: any, formData: any) {


    if (!formData.username) {
      formData.username = "UNKNOWN";
    }
    formData.movieID = this.movieID;
    formData.movieName = this.movieName;
    formData.media_type = this.mediaType;
    if (!formData.movieID || !formData.movieName || !formData.media_type) {
      this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Movie Data Invalid' })

    } else {
      this.downloadReqService.addDownloadRequest(formData).subscribe(e => {
        requestForm.reset();
        this.messageService.add({ severity: 'info', summary: 'success', detail: 'Request sent successfully' })
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Internal Server Error! Try again after Sometime..' })

      });

    }

  }
}
