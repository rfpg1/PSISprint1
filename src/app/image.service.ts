import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Photo } from './photo';
import { IMAGES } from './mock-images';

@Injectable({
  providedIn: 'root'
})
export class ImageService {


  private photos = []
  
  constructor() { }
  
  getImages(): Observable<Photo[]> {
    const images = of(IMAGES);
    images.subscribe(photos => this.photos = photos);
    return images;
  }

  addPhoto(photo) {
    this.photos.push(photo)
  }

  deletePhoto(photo) {
    for(var i = 0; i < this.photos.length; i++) {
      if(this.photos[i] === photo) {
        this.photos.splice(i, 1);
      }
    } 
  }
}
