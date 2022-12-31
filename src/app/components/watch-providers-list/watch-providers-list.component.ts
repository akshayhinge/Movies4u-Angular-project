import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/internal/operators/delay';
import { MoviesService } from 'src/app/service/movies.service';
import { TvService } from 'src/app/service/tv.service';

@Component({
  selector: 'app-watch-providers-list',
  templateUrl: './watch-providers-list.component.html',
  styleUrls: ['./watch-providers-list.component.scss']
})
export class WatchProvidersListComponent implements OnInit {

  providersList:any=[];
  shows: any=[];
  providerName:string="";
  responsiveOptions:any;
  totalResults: any;
  total_results: any;
  iconsloader:boolean=true;
  contentloader:boolean=false;
  page:number=1;
  constructor(private tvservice:TvService,private movieservice:MoviesService) { }

  ngOnInit() {
    this.watchProvidersList();
  }
watchProvidersList(){
this.tvservice.getWatchProviders().pipe(delay(2000)).subscribe((res:any)=>{
  this.providersList=res.results;
  console.log(this.providersList);
  
  this.iconsloader=false;
}),(error=>{
  console.log(error)
})
}
providersShows(providerName:string){
  this.contentloader=true;
  this.providerName=providerName;
  this.tvservice.getDiscoverTVShow(this.page,"popularity.desc","en%7Chi",providerName).subscribe((res:any)=>{
    this.shows= res.results.slice(0,res.results.length/2);

    this.totalResults = res.total_results;
    
  });
  this.movieservice.getDiscoverMovie(this.page,"popularity.desc",true,false,"en%7Chi",providerName).subscribe((res:any)=>{
    this.shows=this.shows.concat(res.results.slice(0,res.results.length/2));
    console.log(this.shows);
    this.totalResults+=res.total_results;
    this.contentloader=false;
  });
  
}
changePage(event) {
  this.page=event.pageIndex + 1;
  this.providersShows(this.providerName);
  // this.loader = false;
}
ismovie(item:any){
  if(item.original_title){
    return "movies";
  }else
  {
    return "tv"
  }
}

}
