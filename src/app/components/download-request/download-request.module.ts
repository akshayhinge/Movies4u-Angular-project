import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { DownloadRequestComponent } from './download-request.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    DownloadRequestComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    FormsModule,
    ToastModule,
  ],
  exports:[
    DownloadRequestComponent
  ]
})
export class DownloadRequestModule { }
