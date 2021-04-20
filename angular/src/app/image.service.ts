import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Photo } from './photo';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  //private imageUrl = 'http://localhost:3054'
  private imageUrl = 'http://appserver.alunos.di.fc.ul.pt:3054'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', })
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

  addPhoto(photo): Observable<Photo> {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    return this.http.post<Photo>(`${this.imageUrl}/photo/photo`, photo, { headers: header }).pipe(
      tap(_ => console.log('Upload Photo')),
      catchError(this.handleError<any>('addPhoto', ''))
    );
  }

  deletePhoto(photo) {
    return this.http.delete<any>(`${this.imageUrl}/photo/${photo._id}`).pipe(
      tap(_ => console.log('Fetched Images')),
      catchError(this.handleError<Photo[]>('getMostLikes', []))
    );
  }

  getMyPhotos(user): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.imageUrl}/photo/photo?user=${user}`).pipe(
      tap(_ => console.log('Fetched Images')),
      catchError(this.handleError<Photo[]>('getMostLikes', []))
    );
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
