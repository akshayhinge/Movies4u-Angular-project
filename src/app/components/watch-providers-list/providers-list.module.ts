import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersListRoutingModule } from './providers-list-routing.module';
import { WatchProvidersListComponent } from './watch-providers-list.component';
import { SkeletonModule } from 'src/app/shared/skeleton/skeleton.module';
import { MatPaginatorModule } from '@angular/material';
import { TvShowsModule } from '../tv-shows/tv-shows.module';
import { TooltipModule } from 'primeng/tooltip';
import { PipeModule } from 'src/app/pipe/pipe.module';


@NgModule({
  declarations: [
    WatchProvidersListComponent
  ],
  imports: [
    CommonModule,
    ProvidersListRoutingModule,
    SkeletonModule,
    MatPaginatorModule,
    TvShowsModule,
    TooltipModule,
    PipeModule
  ],
  exports: [
    WatchProvidersListComponent
  ]

})
export class ProvidersListModule { }
