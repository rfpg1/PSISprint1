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
    this.isLiked(this.pic)
    this.isFavorite(this.pic)
  }

  profile(): Boolean {
    return localStorage.getItem("profile") === "true";
  }

  deletePhoto(pic) {
    if (confirm("Deseja apagar a fotografia")) {
      this.imageService.deletePhoto(pic).subscribe(r => { window.location.reload(); });
    }
  }

  addLike(photo) {
    const user = localStorage.getItem("user");
    if (user !== null){
      this.imageService.addLike(user, photo).subscribe(r => { window.location.reload(); })
    }
  }

  isLiked(photo) {
    this.imageService.isLiked(localStorage.getItem("user"), photo).subscribe(r => {
      if(r.message === "True"){
        this.changeColorLike();
      }
    })
  }

  changeColorLike() {
    var like = document.getElementById("like");
    like.style.color = "red";
  }

  changeColorFavorite() {
    var fav = document.getElementById("fav");
    fav.style.color = "yellow";
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

  addFav(pic){
    const user = localStorage.getItem("user");
    if(user !== null){
      this.imageService.addFavorite(user, pic).subscribe(r => {window.location.reload()})
    }
  }

  isFavorite(photo){
    this.imageService.isFavorite(localStorage.getItem("user"), photo).subscribe(r => {
      if(r.message === "True"){
        this.changeColorFavorite();
      }
    })
  }
}
