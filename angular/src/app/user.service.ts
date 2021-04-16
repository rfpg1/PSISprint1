import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) }

  constructor(private http: HttpClient) { }

  adduser(registo: any): Observable<any> {
    return this.http.post<any>("http://appserver.alunos.di.fc.ul.pt:3054/user/regist", registo, this.httpOptions).pipe(tap(a => { }))
  }

  loginuser(username, password): Observable<any> {
    return this.http.get<any>(`http://appserver.alunos.di.fc.ul.pt:3054/user/login/?name=${username}&pw=${password}`).pipe(tap(a => { }))
  }
}