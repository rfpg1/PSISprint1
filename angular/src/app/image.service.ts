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
  private imageUrl = 'http://10.101.151.25:3054'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', })
  }

  constructor(private http: HttpClient) { }

  getMostRecentImages(): Observable<Photo[]> {
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

  getFavoriteImages(user): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.imageUrl}/photo/favorites?user=${user}`)
    .pipe(
      tap(_ => console.log('Fetched Images')),
      catchError(this.handleError<Photo[]>('getFavoriteImages', []))
    );
  }

  addPhoto(photo): Observable<Photo> {
    return this.http.post<Photo>(`${this.imageUrl}/photo/photo`, photo, this.httpOptions).pipe(
      tap(_ => console.log('Upload Photo')),
      catchError(this.handleError<any>('Photo failed to upload', ''))
    );
  }

  deletePhoto(photo) {
    return this.http.delete<any>(`${this.imageUrl}/photo/${photo._id}`).pipe(
      tap(_ => console.log('Fetched Images')),
      catchError(this.handleError<Photo[]>('getMostLikes', []))
    );
  }

  getPhoto(id) {
    return this.http.get<any>(`${this.imageUrl}/photo/${id}`).pipe(
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

  addLike(user, photo) {
    return this.http.put<any>(`${this.imageUrl}/photo/like/${photo._id}`, { user: user }, this.httpOptions).pipe(
      tap(_ => console.log('Like succeded')),
      catchError(this.handleError<Photo[]>('addLike', []))
    );
  }

  isLiked(user, photo) {
    return this.http.get<any>(`${this.imageUrl}/photo/isLiked?user=${user}&id=${photo._id}`).pipe(
      tap(_ => console.log('Probably liked')),
      catchError(this.handleError<any>('addLike', []))
    );
  }

  addFavorite(user, photo) {
    return this.http.post<any>(`${this.imageUrl}/photo/favorite/${photo._id}`, { user, photo } , this.httpOptions).pipe(
      tap(_ => console.log('Favorite Successed')),
      catchError(this.handleError<any>('addFavorite', []))
    );
  }

  isFavorite(user, photo) {
    return this.http.get<any>(`${this.imageUrl}/photo/isFavorite?user=${user}&id=${photo._id}`).pipe(
      tap(_ => console.log('Probably favorite')),
      catchError(this.handleError<any>('isFavorite', []))
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
      
      //alert(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
