import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-movies',
  templateUrl: './admin-movies.component.html',
  styleUrls: ['./admin-movies.component.scss']
})
export class AdminMoviesComponent implements OnInit {

  movies: any[] = [];
  totalResults: number = 0;
  loader: boolean = false;
  first: number = 0;
  rows = 10;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getSystemMovies(1);
  }

  getSystemMovies(page: number) {

    this.adminService.getMoviesBypage(page).subscribe((res: any) => {
      this.movies = res.result;
      this.totalResults = res.total_results;
      this.loader = false;
      console.log(this.movies);

    })
  }

  
  onMovieRowEditSave(movie: any) {
    this.adminService.updateMovieByid(movie.id,movie).subscribe((e:any)=>{
      console.log(e);
      
    });
}
onDownloadRowEditSave(id:number,download:any){
  this.adminService.updateMovieDownloadByID(id,download).subscribe((e)=>{
    console.log(e);
    
  })
}



}
