import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) }

  private imageUrl = 'http://localhost:3054'
  //private imageUrl = 'http://10.101.151.25:3054'

  constructor(private http: HttpClient) { }

  adduser(registo: any): Observable<any> {
    return this.http.post<any>(`${this.imageUrl}/user/regist`, registo, this.httpOptions).pipe(tap(a => { }))
  }

  loginuser(username, password): Observable<any> {
    return this.http.get<any>(`${this.imageUrl}/user/login/?name=${username}&pw=${password}`).pipe(tap(a => { }))
  }
}