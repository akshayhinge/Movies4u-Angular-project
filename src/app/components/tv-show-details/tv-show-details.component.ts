import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { AppTvDialogComponent } from './app-tv-dialog/app-tv-dialog.component';
import { TvService } from 'src/app/service/tv.service';
import { DownloadReqService } from 'src/app/service/admin-downloadReq.service';
import { delay } from 'rxjs/internal/operators/delay';
import { MessageService } from 'primeng/api';
import { AdminTVService } from 'src/app/service/admin-tv.service';
import { config } from 'process';


@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.scss'],
  providers: [MessageService]
})

export class TvShowDetailsComponent implements OnInit {

  public id: number;
  public video: boolean;
  episode: any;
  baseUrl = 'https://www.youtube.com/embed/';
  embedUrl= "https://autoembed.to/tv/tmdb/";
  autoplay = '?rel=0;&autoplay=1&mute=0';
  related_video: any;
  backdrop: any;
  _posters: any;
  _recomend: any;
  responsiveOptions;
  downloads: any[] = [];
  comments: any[] = [];
  seasons_count: any[] = [];
  episodes_count: any[] = [];
  selectedSeason: number=1;
  selectedEpisode: number=1;
  constructor(
    private tvService: TvService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private DownloadReqService:DownloadReqService,
    private adminTV: AdminTVService,
    private messageService: MessageService
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
      this.id = params.id;
      this.getTvDetails(this.id);
      this.getTvVideos(this.id);
      this.getDownloadLinks(this.id);
      this.getTvBackropsImages(this.id);
      this.getRecomendTv(this.id);
    });

  }
  onSeasonChange() {
    this.episodes_count = [];
    this.episode.seasons.forEach(element => {
      if (element.season_number == this.selectedSeason) {
        for (let i = 1; i <= element.episode_count; i++) {
          this.episodes_count.push({ label: 'Episode ' + i, value: i });
        }
      }
    });

  }
  getTvDetails(id) {
    this.seasons_count = [];
    this.tvService.getTVShow(id).subscribe((res: any) => {
      this.episode = res;
      for (let i = 1; i <= this.episode.number_of_seasons; i++) {
        this.seasons_count.push({ label: 'Season ' + i, value: i });
      }


    });
  }

  getTvVideos(id) {
    this.tvService.getTvVideos(id).subscribe((res: any) => {
      if (res.results.length) {
        this.video = res.results[0];
        this.related_video = res.results;
      }
    });
  }

  openDialogTv(video): void {
    this.video['url'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + video.key + this.autoplay);
    this.dialog.open(AppTvDialogComponent, {
      height: '600px',
      width: '900px',
      data: { video: this.video }
    });
  }
  openDialogWatch(): void {
    this.video['url'] = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.embedUrl}${this.id}-${this.selectedSeason}-${this.selectedEpisode}`);
      // `https://www.2embed.to/embed/tmdb/tv?id=${this.id}&s=${this.selectedSeason}&e=${this.selectedEpisode}`);


    this.dialog.open(AppTvDialogComponent, {
      height: '600px',
      width: '900px',
      data: { video: this.video }
    });
  }


  getTvBackropsImages(id) {
    this.tvService.getTvBackdropsImages(id).subscribe((res: any) => {
      this.backdrop = res.backdrops;
    });
  }

  getRecomendTv(id) {
    this.tvService.getRecomendTv(id).subscribe((res: any) => {
      this._recomend = res.results;
    },(error:any)=>{
      console.log(error);
      
    });
  }
  getDownloadLinks(id: number) {
    this.adminTV.getTvShowDownloadByMovieID(id).pipe(delay(2000)).subscribe((res: any) => {
      this.downloads = res;

      stop();
    })
    this.downloads = [];
  }
  getMovieComments(id: any) {
    this.adminTV.getTvShowCommentBymovieID(id).subscribe((e: any) => {
      this.comments = e;
    })
  }

  onCommentFormSubmit(commentForm: any) {
    commentForm.date = new Date();
    if (!commentForm.username) {
      commentForm.username = "UNKNOWN";
    }
    this.adminTV.addTvShowCommentBymovieID(this.id, commentForm.value).subscribe((e: any) => {
      this.comments.push(e);
      commentForm.reset();
      this.messageService.add({ severity: 'info', summary: 'success', detail: 'Comment sent successfully' });
    }, (error: any) => {

      this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Failed to send comment' })
    })
  }
  onRequestFormSubmit(requestForm: any) {

    if (!requestForm.username) {
      requestForm.username = "UNKNOWN";
    }
    // requestForm.imdbID=this.movie.imdb_id;
    // requestForm.movieName=this.movie.title;
    this.DownloadReqService.addDownloadRequest(requestForm.value).subscribe(e => {
      requestForm.reset();
      this.messageService.add({ severity: 'info', summary: 'success', detail: 'Request sent successfully' })
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Failed to send Request' })

    })
  }

}
