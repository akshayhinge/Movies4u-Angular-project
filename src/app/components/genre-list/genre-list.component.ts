import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { TvService } from 'src/app/service/tv.service';


@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit {
  @Input() ShowMovieGenreList= false;
  @Input() ShowTVGenreList= false;

  genreslist: any;
  loader = true;

  constructor(
    private _movie: MoviesService,
    private _tv: TvService,
  ) { }

  ngOnInit() {
    if(this.ShowMovieGenreList){
      this.MovieGenre();
    }
    if(this.ShowTVGenreList){
      this.TvGenre();
    }
  }

  MovieGenre() {
    this._movie.getGenres().subscribe((res: any) => {
      this.genreslist = res.genres;
      this.loader = false;
    });
  }
  TvGenre() {
    this._tv.getGenres().subscribe((res: any) => {
      this.genreslist = res.genres;
      this.loader = false;
      
    });
  }

}
