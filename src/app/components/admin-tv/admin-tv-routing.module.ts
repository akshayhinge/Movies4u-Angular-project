import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmintvComponent } from './admin-tv.component';


const routes: Routes = [
  {
    path: '',
    component: AdmintvComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTVRoutingModule { }
