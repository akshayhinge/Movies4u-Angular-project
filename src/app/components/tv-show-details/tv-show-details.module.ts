import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvShowDetailsRoutingModule } from './tv-show-details-routing.module';
import { TvShowDetailsComponent } from './tv-show-details.component';
import { TabViewModule } from 'primeng/tabview';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MatIconModule } from '@angular/material';
import { AppTvDialogComponent } from './app-tv-dialog/app-tv-dialog.component';
import { CarouselModule } from 'primeng/carousel';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { DownloadRequestModule } from '../download-request/download-request.module';
import { MovieCommentsModule } from '../movie-comments/movie-comments.module';
import {DropdownModule} from 'primeng/dropdown';
import { TvshowCommentsModule } from '../tvshow-comments/tvshow-comments.module';



@NgModule({
  declarations: [
    TvShowDetailsComponent,
    AppTvDialogComponent,
  ],
  entryComponents: [
    AppTvDialogComponent
  ],
  imports: [
    CommonModule,
    TvShowDetailsRoutingModule,
    PipeModule,
    TabViewModule,
    MatTabsModule,
    MatDialogModule,
    MatIconModule,
    CarouselModule,
    FormsModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    ToastModule,
    DownloadRequestModule,
    MovieCommentsModule,
    DropdownModule,
    TvshowCommentsModule
  ]
})
export class TvShowDetailsModule { }
