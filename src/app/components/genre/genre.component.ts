import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { ActivatedRoute, Params } from '@angular/router';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  moviesGenre: any;
  title: string;
  public id: number;
  totalResults:number;
  loader = true;

  constructor(
    private movieService: MoviesService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.title = params['name'];
      this.getMoviesGenre(1,this.id);
    });
  }

  getMoviesGenre(page,id) {
    this.movieService.getMoviesByGenre(page,id,"hi%7Cen",true,"popularity.desc").subscribe((res: any) => {
        this.moviesGenre = res.results;
        this.totalResults=res.total_results;
        this.loader = false;
    });
  }
  changePage(event) {
    this.getMoviesGenre(event.pageIndex + 1 ,this.id);
    // this.loader = false;
  }

}
