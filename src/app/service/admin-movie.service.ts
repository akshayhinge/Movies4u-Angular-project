import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminMovieService {

  private baseUrl = "http://localhost:8080/movies/";
  constructor(private http: HttpClient) { }
  
  public getMoviesBypage(page: number):Observable<any> {
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get(`${this.baseUrl}${page}`, { headers });
  }
  
  public addMovieByGenre(genre:any[],movie:any):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.post(`${this.baseUrl}genreID/${genre}`,movie, { headers });
  }
  
  public updateMovieByid(id:number,movie:any):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.put(`${this.baseUrl}${id}`,movie, { headers });
  }

  public deleteMovieByid(id:number):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.delete(`${this.baseUrl}${id}`, { headers });
  }
  public getMovieDownloadByMovieID(movieID:number):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get(`${this.baseUrl}download/${movieID}`, { headers });
  }
  
  public getAllDownloadByPage(page:number):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get(`${this.baseUrl}download/page/${page}`, { headers });

  }

  public addMovieDownloadByMovieID(movieID:number,movie:any):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.post(`${this.baseUrl}download/${movieID}`,movie, { headers });
  }
  public updateMovieDownloadByID(id:number,movie:any):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.put(`${this.baseUrl}download/${id}`,movie, { headers });
  }
  
  public deleteMovieDownloadByID(id:number):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.delete(`${this.baseUrl}download/${id}`, { headers });
  }

  public getMovieCommentBymovieID(movieID:number):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get(`${this.baseUrl}comment/${movieID}`, { headers });
  }

  public  addMovieCommentBymovieID(movieID:number,comment:any):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.post(`${this.baseUrl}comment/${movieID}`, comment,{ headers });
  }
  
  public deleteCommentByid(id:number):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.delete(`${this.baseUrl}comment/${id}`,{ headers });
  }
}
