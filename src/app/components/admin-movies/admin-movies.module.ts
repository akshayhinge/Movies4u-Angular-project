import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMoviesRoutingModule } from './admin-movies-routing.module';
import { AdminMoviesComponent } from './admin-movies.component';
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
// import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule } from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {  MultiSelectModule } from 'primeng/multiselect';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { SkeletonModule } from 'src/app/shared/skeleton/skeleton.module';


@NgModule({
  declarations: [
    AdminMoviesComponent
  ],
  imports: [
    CommonModule,
    AdminMoviesRoutingModule,
    TableModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    ConfirmDialogModule,
    FileUploadModule,
    ToastModule,
    ToolbarModule,
    MatRippleModule,
    PipeModule,
    SkeletonModule,
    ScrollingModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextareaModule,
    MultiSelectModule,
    
    
    
  ],
  exports:[
    AdminMoviesComponent
  ]

})
export class AdminMoviesModule { }
