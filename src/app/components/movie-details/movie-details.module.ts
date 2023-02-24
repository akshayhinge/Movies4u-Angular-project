import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDetailsRoutingModule } from './movie-details-routing.module';
import { MovieDetailsComponent } from './movie-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MatIconModule } from '@angular/material';
import { AppMovieDialogComponent } from './app-movie-dialog/app-movie-dialog.component';
import { CarouselModule } from 'primeng/carousel';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MovieCommentsComponent } from '../movie-comments/movie-comments.component';
import { DownloadRequestComponent } from '../download-request/download-request.component';
import { DownloadRequestModule } from '../download-request/download-request.module';
import { MovieCommentsModule } from '../movie-comments/movie-comments.module';


@NgModule({
  declarations: [
    MovieDetailsComponent,
    AppMovieDialogComponent

  ],
  entryComponents: [
    AppMovieDialogComponent
  ],
  imports: [
    CommonModule,
    MovieDetailsRoutingModule,
    PipeModule,
    MatTabsModule,
    MatDialogModule,
    MatIconModule,
    CarouselModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    FormsModule,
    ToastModule,
    DownloadRequestModule,
    MovieCommentsModule

    
  ],

})
export class MovieDetailsModule { }
