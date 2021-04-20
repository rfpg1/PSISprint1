import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { ImageService } from '../image.service';
import { PhotoViewerComponent } from '../photo-viewer/photo-viewer.component';
import { MatDialog } from '@angular/material/dialog';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user;
  pics: Photo[];

  constructor(private imageService: ImageService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("user")
    this.getMyPhotos();
  }

  loggedIn(): Boolean  {
    return localStorage.getItem("login") === "true";
  }

  logout(): void {
    localStorage.setItem("login", "false")
    localStorage.removeItem("user")
    window.location.href ="/dashboard"
  }

  getMyPhotos(): void{
    this.imageService.getMyPhotos(this.user).subscribe(photos => {this.pics = photos})
  }

  openDialog(pic: Photo): void {
    this.dialog.open(PhotoViewerComponent, {
      data: pic,
      width: '70%',
      panelClass: 'myPanel',
      backdropClass: 'bdrop'
    });
  }

  goToDashboard(){
    window.location.href = "/dashboard"
    localStorage.setItem("profile", "false")
  }

  onUpload(): void {
    const dialogRef = this.dialog.open(UploadComponent, {
      width: '70%',
      panelClass: 'myPanel',
      backdropClass: 'bdrop'
    });
  }

}
