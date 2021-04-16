import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Photo } from '../photo';
import { ImageService } from '../image.service';
import { PhotoViewerComponent } from '../photo-viewer/photo-viewer.component';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  pics: Photo[];

  constructor(private imageService: ImageService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMostRecentImages();
  }

  getMostRecentImages(): void {
    this.imageService.getMostRecentImages()
      .subscribe(pics => {
        this.pics = pics
        console.log(this.pics)
      });
  }

  getMostLikesImages(): void {
    this.imageService.getMostLikesImages()
      .subscribe(pics => this.pics = pics);
  }

  openDialog(pic: Photo): void {
    console.log(pic)
    this.dialog.open(PhotoViewerComponent, {
      data: pic,
      width: '70%',
      panelClass: 'myPanel',
      backdropClass: 'bdrop'
    });
  }

  loggedIn(): Boolean {
    return localStorage.getItem("login") !== null;
  }
}
