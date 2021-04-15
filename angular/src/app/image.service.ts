import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Photo } from './photo';
import { IMAGES } from './mock-images';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }
  
  getImages(): Observable<Photo[]> {
    const images = of(IMAGES);
    return images;
  }
}
