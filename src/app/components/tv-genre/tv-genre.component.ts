import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MoviesService } from 'src/app/service/movies.service';
import { TvService } from 'src/app/service/tv.service';


@Component({
  selector: 'app-tv-genre',
  templateUrl: './tv-genre.component.html',
  styleUrls: ['./tv-genre.component.scss']
})
export class TvGenreComponent implements OnInit {
  totalResults:number;
  _tv: any;
  title: string;
  loader:boolean=true;
  public id: number;

  constructor(
    private tvService: TvService,
    private router: ActivatedRoute

  ) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.title = params['name'];
      this.getTvByGenre(1,this.id);
    });
  }

  getTvByGenre(page,id) {
    this.tvService.getTVShowByGenre(page,id,"hi%7Chi","popularity.desc").subscribe((res: any) => {
        this._tv = res.results;
        this.totalResults=res.total_results;
        this.loader=false;
    });
  }
  changePage(event) {
    this.getTvByGenre(event.pageIndex + 1,this.id);
    this.loader = false;
  }


}
