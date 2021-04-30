import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageService } from '../image.service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../photo';
import { UploadComponent } from '../upload/upload.component';


@Component({
  selector: 'app-photo-page',
  templateUrl: './photo-page.component.html',
  styleUrls: ['./photo-page.component.css']
})
export class PhotoPageComponent implements OnInit {

  pic: Photo;

  constructor(private route:ActivatedRoute, private imageService:ImageService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPhoto();
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

  getPhoto(): void{
    const id = this.route.snapshot.paramMap.get('id');
    //this.route.paramMap.subscribe(param => id = param.get('id'));
    this.imageService.getPhoto(id)
      .subscribe(pic => this.pic = pic);
  }

  addLike(photo) {
    this.imageService.addLike(localStorage.getItem("user"), photo).subscribe(r => { window.location.reload(); })
  }
  
  share(){
    var id = this.pic._id;
    document.addEventListener("copy", (e:ClipboardEvent) => {
      e.clipboardData.setData("text/plain", ("http://localhost:4200/photo/" + id));
      e.preventDefault();
      document.removeEventListener("copy", null);
    });
    document.execCommand("copy");
    alert("Link copiado para a clipboard!");
  }
}
