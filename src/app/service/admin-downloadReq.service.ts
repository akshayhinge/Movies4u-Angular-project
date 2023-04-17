import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadReqService {

  //private baseUrlForDownloadReq="http://localhost:8080/downloadrequest/";
   private baseUrlForDownloadReq="https://movies4u-backend-production.up.railway.app/";
  constructor(private http: HttpClient) { }

  public getDownloadRequest(page:number):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get(`${this.baseUrlForDownloadReq}${page}`,{ headers });
  }
  
  public addDownloadRequest(request:any):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.post(`${this.baseUrlForDownloadReq}`,request,{ headers });
  }
  public deleteDownloadRequest(id:number):Observable<any>{
    let username: String = "akshay";
    let password: String = "pass123";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.delete(`${this.baseUrlForDownloadReq}${id}`,{ headers });
  }

  

}
