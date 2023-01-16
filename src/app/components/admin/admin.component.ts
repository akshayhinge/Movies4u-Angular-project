import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { Download } from 'src/app/service/Download';
import { GenresList } from 'src/app/service/genrelist';
import { Movie } from 'src/app/service/Movie';
import { MoviesService } from 'src/app/service/movies.service';

interface Genre{
  id:number;
  name:String;
} 

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})



export class AdminComponent implements OnInit {

 
  topRated: any=[];
  responsiveOptions;
  loader = true;
  totalResults: any;
  total_results: any;
  searchRes: any;
  searchStr: string;
  movie:any;
  genrename : Genre[];
  selectedGenre : any[]=[];
  selectedMovie:Movie ;
  selectedMovieID:number=0;


  addmovieform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
    choosecategory: new FormControl('', [Validators.required]),
    productimg: new FormControl('', [Validators.required]),
  });

  constructor(private movieService: MoviesService,private adminService:AdminService) {

  }

  ngOnInit() {
    this.getTopRatedMovies(1);
    // this.getmoviesbypage(1);
    this.getALlMovieGenre();
  }
  addMovieDisplay: boolean = false;

  showAddMovieDialog(movie:any) {
      this.addMovieDisplay = true;
      this.movie=movie;
      this.selectedMovie=movie;
     
      movie.genre_ids.forEach(element => {
        this.selectedGenre.push(element);
      });
     
      
  }

  onMovieSubmit(selectedMovie){
   this.adminService.addMovieBycategory(this.selectedGenre, selectedMovie.value).subscribe((res:any)=>{
    console.log(res);
   if(res){
    this.showAddDownloadDialog();
   }else{
    alert("Somthing went wrong Try Again");
   }
   })
  }

  public getALlMovieGenre(){
    this.adminService.getALlMovieGenre().subscribe((res:any)=>{
      this.genrename=res; 
    });
  }

  addDownloadDisplay:boolean=false;

showAddDownloadDialog(){
this.addDownloadDisplay=true;


}
onDownloadSubmit(selectdDownload,id){

  console.log(selectdDownload.value);
  
 this.adminService.addMovieDownloadByMovieID(id,selectdDownload.value).subscribe((res:any)=>{
  console.log(res);
  
 })
  
  
  
  
}
  addGenreDisplay:boolean=false;

showAddGenreDialog(){
this.addGenreDisplay=true;

}
onGenreSubmit(selectedGenre){
  console.log(selectedGenre.value);

}

  getTopRatedMovies(page: number) {
    this.movieService.getDiscoverMovie(page,"popularity.desc",false,true,"hi%7Cmr","","2022").subscribe((res:any)=>{
      this.topRated=res.results;
      this.totalResults = res.total_results;
      this.loader = false;
    })


  }

  changePage(event) {
    this.loader = true;
    this.getTopRatedMovies(event.pageIndex + 1);
  }

  searchMovies() {
    this.movieService.multisearch(1,this.searchStr,false).subscribe((res:any)=>
    this.searchRes= res.results
    );
  }
  
  public getmoviesbypage(page:number){
    this.adminService.getMoviesBypage(page).subscribe((res:any)=>{
      // console.log(e)
      this.topRated=res.result;
      this.totalResults = res.total_results;
      this.loader = false;
    })
    
  }
}
