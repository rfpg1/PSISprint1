import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Photo } from './photo';
import { IMAGES } from './mock-images';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  //private imageUrl = 'http://appserver.alunos.di.fc.ul.pt:3054'
  private imageUrl = 'http://localhost:3100'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }
  
  getMostRecentImages(): Observable<Photo[]> {
    //const images = of(IMAGES);
    return this.http.get<Photo[]>(`${this.imageUrl}/mural`)
      .pipe(
        tap(_ => console.log('Fetched Images')),
        catchError(this.handleError<Photo[]>('getMostRecent', []))
      );
  }

  getMostLikesImages(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.imageUrl}/mural/favorites`)
      .pipe(
        tap(_ => console.log('Fetched Images')),
        catchError(this.handleError<Photo[]>('getMostLikes', []))
      );
  }

  addPhoto(photo): Observable<Photo[]> {
    //this.photos.push(photo)
    console.log("photo");
    console.log(photo);
    return this.http.post<any>(`${this.imageUrl}/photo/photo`, photo, this.httpOptions).pipe(tap(a=>{}))
    //return this.http.post<any>("http://appserver.alunos.di.fc.ul.pt:3054/user/regist", registo, this.httpOptions).pipe(tap(a => { }))
  }

  deletePhoto(photo) {
    /*
    for(var i = 0; i < this.photos.length; i++) {
      if(this.photos[i] === photo) {
        this.photos.splice(i, 1);
      }
    } 
    */
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

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
