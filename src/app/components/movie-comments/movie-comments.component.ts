import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { delay } from 'rxjs/internal/operators/delay';
import { AdminMovieService } from 'src/app/service/admin-movie.service';

@Component({
  selector: 'app-movie-comments',
  templateUrl: './movie-comments.component.html',
  styleUrls: ['./movie-comments.component.scss'],
  providers: [MessageService]
})
export class MovieCommentsComponent implements OnInit {
  @Input() showComments: boolean = false;


  comments: any[] = [];
  id: number;

  constructor(
    private adminMovieService: AdminMovieService,
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
    this.adminMovieService.getMovieCommentBymovieID(id).subscribe((e: any) => {
      this.comments=e;
    })
  }

  onCommentFormSubmit(commentForm: any, formData: any) {
    commentForm.date = new Date();
    if (!formData.username) {
      formData.username = "UNKNOWN";
    }
    console.log(formData);

    this.adminMovieService.addMovieCommentBymovieID(this.id, formData).subscribe((e: any) => {
      this.comments.push(e);
      commentForm.reset();
      this.messageService.add({ severity: 'info', summary: 'success', detail: 'Comment sent successfully' });
    }, (error: any) => {

      this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Failed to send comment' })
    })
  }

}
