import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDownloadRoutingModule } from './admin-download-routing.module';
import { AdminDownloadComponent } from './admin-download.component';
import {TableModule} from 'primeng/table';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
// import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
@NgModule({
  declarations: [
    AdminDownloadComponent
  ],
  imports: [
    CommonModule,
    AdminDownloadRoutingModule,
    NgxSkeletonLoaderModule,
    TableModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    ConfirmDialogModule
  ],
  exports:[
    AdminDownloadComponent
  ]
})
export class AdminDownloadModule { }
