import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  baseUrl: string;
  apiKey: string;
  language: string;
  region: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    // this.apiKey = 'dd4d819639705d332d531217b4f7c6b6';
    this.apiKey = '2f0353cde3bd4cfe35225d005de3ca22';
    this.language = 'en-HI';
    this.region = 'IN';
  }
  getWatchProviders():Observable<any>{
    return this.http.get(`${this.baseUrl}watch/providers/tv?api_key=${this.apiKey}&language=${this.language}&watch_region=${this.region}`);
  }
  getDiscoverTVShow(page:number,sort_by:string,language:string,provider?:string,year?:string):Observable<any>{
    return this.http.get(`${this.baseUrl}discover/tv?api_key=${this.apiKey}&language=${this.language}&sort_by=${sort_by}&first_air_date_year=${year}&page=${page}&include_null_first_air_dates=false&with_watch_providers=${provider}&with_original_language=${language}&watch_region=${this.region}`);
  }
  getTvOnTheAir(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/on_the_air?api_key=${this.apiKey}&page=${page}&language=${this.language}`);
  }

  getTVAiringToday(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/airing_today?api_key=${this.apiKey}&page=${page}&language=${this.language}`);
  }

  getPopularTVShow(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/popular?api_key=${this.apiKey}&page=${page}&language=${this.language}`);
  }

  getTopRatedTVShows(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/top_rated?api_key=${this.apiKey}&page=${page}&language=${this.language}`);
  }

  getTVShow(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/${id}?api_key=${this.apiKey}&language=${this.language}`);
  }

  getTvVideos(id: any) {
    return this.http.get(`${this.baseUrl}tv/${id}/videos?api_key=${this.apiKey}&language=${this.language}`);
  }

  getTvBackdropsImages(id: string) {
    return this.http.get(`${this.baseUrl}tv/${id}/images?api_key=${this.apiKey}`);
  }

  getMovieCredits(id: string) {
    return this.http.get(`${this.baseUrl}tv/${id}/credits?api_key=${this.apiKey}&language=${this.language}`);
  }

  getGenres(): Observable<any> {
    return this.http.get(`${this.baseUrl}genre/tv/list?api_key=${this.apiKey}&language=${this.language}`);
  }

  getTVShowByGenre(page:number,genreId: string,language:string,sort_by:string): Observable<any> {
    return this.http.get(`${this.baseUrl}discover/tv?api_key=${this.apiKey}&language=${this.language}&sort_by=${sort_by}&page=${page}&with_genres=${genreId}&with_original_language=${language}&watch_region=${this.region}`);
  }

  getRecomendTv(id: string) {
    return this.http.get(`${this.baseUrl}tv/${id}/recommendations?api_key=${this.apiKey}&language=${this.language}`);
  }

  searchtv(searchStr: string): Observable<any> {
    return this.http.get(`${this.baseUrl}search/tv?api_key=${this.apiKey}&query=${searchStr}`);
  }

}
