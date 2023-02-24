import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminTVService } from 'src/app/service/admin-tv.service';

@Component({
  selector: 'app-tvshow-comments',
  templateUrl: './tvshow-comments.component.html',
  styleUrls: ['./tvshow-comments.component.scss'],
  providers: [MessageService]
})
export class TvshowCommentsComponent implements OnInit {
  @Input() showComments: boolean = false;


  comments: any[] = [];
  id: number;

  constructor(
    private adminTVService: AdminTVService,
    private messageService: MessageService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getMovieComments(this.id);

    });
  }

  getMovieComments(id: number) {
    this.adminTVService.getTvShowCommentBymovieID(id).subscribe((e: any) => {
      this.comments=e;
    })
  }

  onCommentFormSubmit(commentForm: any, formData: any) {
    commentForm.date = new Date();
    if (!formData.username) {
      formData.username = "UNKNOWN";
    }


    this.adminTVService.addTvShowCommentBymovieID(this.id, formData).subscribe((e: any) => {
      this.comments.push(e);
      commentForm.reset();
      this.messageService.add({ severity: 'info', summary: 'success', detail: 'Comment sent successfully' });
    }, (error: any) => {

      this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Failed to send comment' })
    })
  }

}