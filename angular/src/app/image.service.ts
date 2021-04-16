import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Photo } from './photo';
import { IMAGES } from './mock-images';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }
  
  getMostRecentImages(): Observable<Photo[]> {
    const images = of(IMAGES);
    return images;
  }

  getMostLikesImages(): Observable<Photo[]> {
    return of([]);
  }
}
