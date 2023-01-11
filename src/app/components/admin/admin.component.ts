import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Download } from 'src/app/service/Download';
import { GenresList } from 'src/app/service/genrelist';
import { movie } from 'src/app/service/Movie';
import { MoviesService } from 'src/app/service/movies.service';


interface Movie{

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
  genrename : any=[];
  selectedGenre : any=[];
  selectedMovie:movie;
  selectedMovieID:number=0;

  selectedDownload:Download=new Download();
 

  addmovieform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
    choosecategory: new FormControl('', [Validators.required]),
    productimg: new FormControl('', [Validators.required]),
  });

  constructor(private movieService: MoviesService) {

  }

  ngOnInit() {
    this.getTopRatedMovies(1);

  }
  addMovieDisplay: boolean = false;

  showAddMovieDialog(movie:any) {
      this.addMovieDisplay = true;
      this.movie=movie;
      this.genrename=[];
      movie.genre_ids.forEach(element => {
        GenresList.forEach(e=>{
          if(e.id==element){
            this.genrename.push(e);
          }
        })
      });
      console.log(movie);
      console.log(this.genrename);
      
  }
  addDownloadDisplay:boolean=false;

showAddDownloadDialog(){
this.addDownloadDisplay=true;
}
onDownloadSubmit(selectdDownload){
  console.log(selectdDownload.value);
  console.log(this.selectedDownload);
  
  selectdDownload.reset();
  
  
}
  addGenreDisplay:boolean=false;

showAddGenreDialog(){
this.addGenreDisplay=true;
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
  get name() {
    return this.addmovieform.get('name');
  }
  get price() {
    return this.addmovieform.get('price');
  }
  get desc() {
    return this.addmovieform.get('desc');
  }
  get choosecategory() {
    return this.addmovieform.get('choosecategory');
  }
  get productimg() {
    return this.addmovieform.get('productimg');
  }

}
