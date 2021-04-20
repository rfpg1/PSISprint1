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
    if (confirm("Deseja apagar a fotografia")) {
      this.imageService.deletePhoto(pic).subscribe(r => { window.location.reload(); });
      //window.location.reload();
      //TODO
    }
  }
}
