import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDownloadRequestComponent } from './admin-downloadRequest.component';


const routes: Routes = [
  {
    path: '',
    component: AdminDownloadRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDownloadRequestRoutingModule { }
