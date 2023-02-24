import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDownloadRequestRoutingModule } from './admin-downloadRequest-routing.module';
import { AdminDownloadRequestComponent } from './admin-downloadRequest.component';
import {TableModule} from 'primeng/table';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
// import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { MatPaginatorModule } from '@angular/material';
@NgModule({
  declarations: [
    AdminDownloadRequestComponent
  ],
  imports: [
    CommonModule,
    AdminDownloadRequestRoutingModule,
    NgxSkeletonLoaderModule,
    TableModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    MatPaginatorModule
  ],
  exports:[
    AdminDownloadRequestComponent
  ]
})
export class AdminDownloadRequestModule { }
