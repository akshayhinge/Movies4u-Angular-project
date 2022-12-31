import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvGenreRoutingModule } from './tv-genre-routing.module';
import { TvGenreComponent } from './tv-genre.component';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { MatPaginatorModule } from '@angular/material';
import { SkeletonModule } from 'src/app/shared/skeleton/skeleton.module';



@NgModule({
  declarations: [TvGenreComponent],
  imports: [
    CommonModule,
    TvGenreRoutingModule,
    PipeModule,
    MatPaginatorModule,
    SkeletonModule
  ]
})
export class TvGenreModule { }
