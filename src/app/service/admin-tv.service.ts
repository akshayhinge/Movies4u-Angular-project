import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminTVService {

  private baseUrl = "http://localhost:8080/tv/";
   private baseUrl = "https://movies4u-backend-production.up.railway.app/";
  constructor(private http:HttpClient) {}


  public getTvShowsBypage(page: number):Observable<any> {
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get(`${this.baseUrl}${page}`, { headers });
  }
  
  public addTvShowsByGenre(genre:any[],TvShows:any):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.post(`${this.baseUrl}genreID/${genre}`,TvShows, { headers });
  }
  
  public updateTvShowByid(id:number,TvShows:any):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.put(`${this.baseUrl}${id}`,TvShows, { headers });
  }

  public deleteTvShowByid(id:number):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.delete(`${this.baseUrl}${id}`, { headers });
  }
  public getTvShowDownloadByMovieID(TvShowID:number):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get(`${this.baseUrl}download/${TvShowID}`, { headers });
  }
  
  public getAllTvShowByPage(page:number):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get(`${this.baseUrl}download/page/${page}`, { headers });

  }

  public addTvShowDownloadByMovieID(TvShowID:number,TvShows:any):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.post(`${this.baseUrl}download/${TvShowID}`,TvShows, { headers });
  }
  public updateTvShowDownloadByID(id:number,TvShows:any):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.put(`${this.baseUrl}download/${id}`,TvShows, { headers });
  }
  
  public deleteTvShowDownloadByID(id:number):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.delete(`${this.baseUrl}download/${id}`, { headers });
  }

  
  public getTvShowCommentBymovieID(TvShowID:number):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get(`${this.baseUrl}comment/${TvShowID}`, { headers });
  }

  public  addTvShowCommentBymovieID(TvShowID:number,comment:any):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.post(`${this.baseUrl}comment/${TvShowID}`, comment,{ headers });
  }
  
  public deleteCommentByid(id:number):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.delete(`${this.baseUrl}comment/${id}`,{ headers });
  }
}
