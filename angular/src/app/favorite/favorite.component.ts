import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { MatDialog } from '@angular/material/dialog';
import { UploadComponent } from '../upload/upload.component';
import { ImageService } from '../image.service';
import { PhotoViewerComponent } from '../photo-viewer/photo-viewer.component';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  pics: Photo[];

  constructor(private dialog: MatDialog, private imageService: ImageService) { }

  ngOnInit(): void {
    this.getFavoriteImages();
  }

  getFavoriteImages(): void {
    this.imageService.getFavoriteImages(localStorage.getItem('user'))
      .subscribe(pics => {
        console.log(pics)
        this.pics = pics
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

  openDialog(pic: Photo): void {
    this.dialog.open(PhotoViewerComponent, {
      data: pic,
      width: '70%',
      panelClass: 'myPanel',
      backdropClass: 'bdrop'
    });
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
}
