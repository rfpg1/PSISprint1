import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Photo } from '../photo';
import { ImageService } from '../image.service';
import { PhotoViewerComponent } from '../photo-viewer/photo-viewer.component';
import { UploadComponent } from '../upload/upload.component';

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
        console.log(pics)
      });
  }

  getMostLikesImages(): void {
    this.imageService.getMostLikesImages()
      .subscribe(pics => this.pics = pics);
  }

  openDialog(pic: Photo): void {
    this.dialog.open(PhotoViewerComponent, {
      data: pic,
      width: '70%',
      panelClass: 'myPanel',
      backdropClass: 'bdrop'
    });
  }

  loggedIn(): Boolean {
    return localStorage.getItem("login") === "true";
  }

  logout(): void {
    localStorage.setItem("login", "false")
    localStorage.removeItem("user")
    window.location.reload();
  }

  onUpload(): void {
    const dialogRef = this.dialog.open(UploadComponent, {
      width: '70%',
      panelClass: 'myPanel',
      backdropClass: 'bdrop'
    });
  }

  goToProfile(){
    window.location.href = "/profile"
    localStorage.setItem("profile", "true")
  }

  expand(): void {
    if (document.getElementById('dropdown_content').getAttribute('style') === "display: none;") 
      document.getElementById('dropdown_content').setAttribute('style', "display: block;");
    else
      document.getElementById('dropdown_content').setAttribute('style', "display: none;");
  }
}
