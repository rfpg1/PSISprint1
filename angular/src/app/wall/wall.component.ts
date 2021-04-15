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
    this.getImages();
  }

  getImages(): void {
    this.imageService.getImages()
      .subscribe(pics => this.pics = pics);
  }

  openDialog(pic: Photo): void {
    this.dialog.open(PhotoViewerComponent, {
      data: pic,
      width: '40em',
      height: '50em',
      panelClass: 'myPanel',
      backdropClass: 'bdrop'
    });
  }
}
