import { Component, NgModule, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {


  public disabled = false;
  private ficheiro;
  public image;
  public name
  public descricao

  constructor(private imageService: ImageService, private router: Router) { }

  uploadFoto() {
    const reader = new FileReader()
    reader.readAsDataURL(this.ficheiro)
    reader.onload = () => {
      const user = localStorage.getItem("user");
      var boas;
      if (!(this.name === undefined)) {
        if (this.descricao === undefined) {
          if (confirm("Quer enviar a imagem sem a descricao"))
            boas = { user: user, name: this.name.value, likes: 0, descricao: "", date: new Date(), photo: reader.result as String }
          this.imageService.addPhoto(boas).subscribe(r => { window.location.reload() })
        } else {
          boas = { user: user, name: this.name.value, likes: 0, descricao: this.descricao, date: new Date(), photo: reader.result as String }
          this.imageService.addPhoto(boas).subscribe(r => { window.location.reload() })
        }
      } else {
        if (this.descricao == undefined) {
          if (confirm("Quer enviar a imagem sem a descricao"))
            boas = { user: user, name: this.ficheiro.name, likes: 0, descricao: "", date: new Date(), photo: reader.result as String }
          this.imageService.addPhoto(boas).subscribe(r => { window.location.reload() })
        } else {
          boas = { user: user, name: this.ficheiro.name, likes: 0, descricao: this.descricao, date: new Date(), photo: reader.result as String }
          this.imageService.addPhoto(boas).subscribe(r => { window.location.reload() })
        }
      }
    }
  }

  verificado(event: any) {
    this.disabled = true;
    this.ficheiro = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader()
    reader.readAsDataURL(this.ficheiro)
    reader.onload = () => {
      this.image = reader.result as String;
    }
  }

  ngOnInit(): void {
  }
}