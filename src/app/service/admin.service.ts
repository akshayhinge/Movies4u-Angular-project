import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = "http://localhost:8080/movies/";

  constructor(private http: HttpClient) { }

  public getMoviesBypage(page: number) {
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get(`${this.baseUrl}${page}`, { headers });
  }
  
  public addMovieBycategory(genre:any[],movie:any){
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.post(`${this.baseUrl}categoryID/${genre}`,movie, { headers });
  }
  
  public updateMovieByid(id:number,movie:any){
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.put(`${this.baseUrl}${id}`,movie, { headers });
  }

  public deleteMovieByid(id:number){
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.delete(`${this.baseUrl}${id}`, { headers });
  }
  public getMovieDownloadByMovieID(movieID:number){
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get(`${this.baseUrl}download/${movieID}`, { headers });
  }
  
  public getAllDownloadByPage(page:number){
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get(`${this.baseUrl}download/page/${page}`, { headers });

  }

  public addMovieDownloadByMovieID(movieID:number,movie:any){
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.post(`${this.baseUrl}download/${movieID}`,movie, { headers });
  }
  public updateMovieDownloadByID(id:number,movie:any){
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.put(`${this.baseUrl}download/${id}`,movie, { headers });
  }
  
  public deleteMovieDownloadByID(id:number){
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.delete(`${this.baseUrl}download/${id}`, { headers });
  }

  public getALlMovieGenre(){
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get(`${this.baseUrl}category/`, { headers });
  }

  public addMovieGenre(genre:any){
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.post(`${this.baseUrl}category/`,genre, { headers });
  }

  public updateMovieGenreByid(id:number,genre:any){
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.put(`${this.baseUrl}category/${id}`,genre, { headers });
  }
  
  public deleteMovieGenreByid(id:number){
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.delete(`${this.baseUrl}category/${id}`, { headers });
  }
  
  public getMovieCommentBymovieID(movieID:number){
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get(`${this.baseUrl}comment/${movieID}`, { headers });
  }

  public  addMovieCommentBymovieID(movieID:number,comment:any){
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.post(`${this.baseUrl}comment/${movieID}`, comment,{ headers });
  }
  
  public deleteCommentByid(id:number){
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.delete(`${this.baseUrl}comment/${id}`,{ headers });
  }


}
