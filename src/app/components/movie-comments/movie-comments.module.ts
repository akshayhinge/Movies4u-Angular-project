import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCommentsComponent } from './movie-comments.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    MovieCommentsComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    FormsModule,
    ToastModule
    
  ],
  exports:[
    MovieCommentsComponent
  ]
})
export class MovieCommentsModule { }
