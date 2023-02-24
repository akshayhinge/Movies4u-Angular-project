import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGenreService {

  private baseUrl="http://localhost:8080/genre/";
  constructor(private http:HttpClient) { }


  public getALlGenre():Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get(`${this.baseUrl}`, { headers });
  }
  public addGenre(genre:any):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.post(`${this.baseUrl}`,genre, { headers });
  }
  public addAllGenre(genre:any[]):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.post(`${this.baseUrl}all/`,genre, { headers });
  }
  
  public updateGenreByid(id:number,genre:any):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.put(`${this.baseUrl}${id}`,genre, { headers });
  }

  public deleteGenreByid(id:number):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.delete(`${this.baseUrl}${id}`, { headers });
  }
}
