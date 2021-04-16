import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Photo } from '../photo'
import { ImageService } from '../image.service';



@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.css']
})
export class PhotoViewerComponent implements OnInit {

  constructor(private imageService: ImageService, @Inject(MAT_DIALOG_DATA) public pic: Photo) { }

  ngOnInit(): void {
  }

  toString(date: Date): String {
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
  }

  deletePhoto(photo: Photo) {
    this.imageService.deletePhoto(photo);
    window.location.reload();
  }
}
