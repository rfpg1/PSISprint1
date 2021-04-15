import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, publish, tap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) }

  constructor(private http: HttpClient) { }

  adduser(registo: any): Observable<any> {
    return this.http.post<any>("http://appserver.alunos.di.fc.ul.pt:3054/user/regist", registo, this.httpOptions).subscribe(r=>{})
    )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
