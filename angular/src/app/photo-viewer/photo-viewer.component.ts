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

  constructor(@Inject(MAT_DIALOG_DATA) public pic: Photo, private imageService: ImageService) { }

  ngOnInit(): void {
  }

  profile(): Boolean {
    return localStorage.getItem("profile") === "true";
  }

  deletePhoto(pic) {
    this.imageService.deletePhoto(pic).subscribe(r => {console.log("t")});
    window.location.reload();
  }
}
