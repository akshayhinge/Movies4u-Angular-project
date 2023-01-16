import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-download',
  templateUrl: './admin-download.component.html',
  styleUrls: ['./admin-download.component.scss']
})
export class AdminDownloadComponent implements OnInit {
  
  downloads: any[] = [];
  totalResults: number = 0;
  loader: boolean = false;
  first: number = 0;
  rows = 10;


  constructor(private adminService:AdminService) { }

  ngOnInit() {
    this.getMovieDownload(1);
  }

  getMovieDownload(page:number){
    this.adminService.getAllDownloadByPage(page).subscribe((res:any)=>{
      this.downloads=res.result;
      console.log(res.result);
      
      this.totalResults=res.total_results;
    })
  }

  onRowEditInit(movie: any) {
  
    
  }
  
  onRowEditSave(download: any) {
    console.log(download);
    // this.adminService.updateMovieByid(movie.id,movie).subscribe((e:any)=>{
    //   console.log(e);
      
    // });
}

onRowEditCancel(movies: any, index: number) {
   
}

}
