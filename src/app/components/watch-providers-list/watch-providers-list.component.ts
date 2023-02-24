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

  providersList: any = [];
  shows: any = [];
  providerName: string = "";
  responsiveOptions: any;
  totalResults: any;
  total_results: any;
  iconsloader: boolean = true;
  contentloader: boolean = false;

  searchRes: any;
  searchStr: string;

  constructor(private tvservice: TvService, private movieservice: MoviesService) { }

  ngOnInit() {
    this.watchProvidersList();
  }
  watchProvidersList() {
    this.tvservice.getWatchProviders().pipe(delay(2000)).subscribe((res: any) => {
      this.providersList = res.results;

      this.iconsloader = false;
    })
  }
  providersShows(providerName: string, page: number) {
    this.contentloader = true;
    this.providerName = providerName;
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;

    this.tvservice.getDiscoverTVShow(page, "popularity.desc", "en%7Chi", providerName, formattedDate).subscribe((res: any) => {
      this.shows = res.results.slice(0, res.results.length / 2);

      this.totalResults = res.total_results;

    });
    this.movieservice.getDiscoverMovie(page, "popularity.desc", true, false, "en%7Chi", providerName, formattedDate).subscribe((res: any) => {
      this.shows = this.shows.concat(res.results.slice(0, res.results.length / 2));
      this.totalResults += res.total_results;
      this.contentloader = false;
    });

  }
  changePage(event) {
    // this.page=event.pageIndex + 1;
    this.providersShows(this.providerName, event.pageIndex + 1);

  }
  ismovie(item: any) {
    if (item.original_title) {
      return "movies";
    } else {
      return "tv"
    }
  }

}
