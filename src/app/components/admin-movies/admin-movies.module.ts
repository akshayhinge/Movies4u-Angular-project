import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMoviesRoutingModule } from './admin-movies-routing.module';
import { AdminMoviesComponent } from './admin-movies.component';
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
// import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { MatRippleModule } from '@angular/material';

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
    MatRippleModule

    
    
    
  ],
  exports:[
    AdminMoviesComponent
  ]

})
export class AdminMoviesModule { }
