import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { SkeletonModule } from 'src/app/shared/skeleton/skeleton.module';
import { SearchRoutingModule } from './search-routing.module';
import { PipeModule } from 'src/app/pipe/pipe.module';



@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    PipeModule,
    SkeletonModule,
    ScrollingModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  exports:[
    SearchComponent
  ]
})
export class SearchModule { }
