import { Component, OnInit } from '@angular/core';
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

  constructor(private imageService: ImageService, private router: Router) { }

  clicarFoto() {
    console.log("boas");
  }

  uploadFoto(event: any) {
    if (!(event.target.name.value === "")) {
      if (event.target.descricao.value === "") {
        if (confirm("Quer enviar a imagem sem a descricao")) {
          const reader = new FileReader()
          reader.readAsDataURL(this.ficheiro)
          reader.onload = () => {
            var boas = { user: localStorage.getItem("user"), name: event.target.name.value, likes: 0, descricao: event.target.descricao.value, date: new Date(), photo: reader.result as String }
            this.imageService.addPhoto(boas).subscribe(r => { console.log(r) })
            window.location.reload();
          }
        }
      } else {
        const reader = new FileReader()
        reader.readAsDataURL(this.ficheiro)
        reader.onload = () => {
          var boas = { user: localStorage.getItem("user"), name: event.target.name.value, likes: 0, descricao: event.target.descricao.value, date: new Date(), photo: reader.result as String }
          this.imageService.addPhoto(boas).subscribe(r => { console.log(r) })
          window.location.reload();
        }
      }
    } else if (event.target.descricao.value === "") {
      if (confirm("Quer enviar a imagem sem a descricao")) {
        const reader = new FileReader()
        reader.readAsDataURL(this.ficheiro)
        reader.onload = () => {
          var boas = { user: localStorage.getItem("user"), name: this.ficheiro.name, photo: reader.result as String, likes: 0, descricao: event.target.descricao.value, date: new Date() }
          this.imageService.addPhoto(boas).subscribe(r => { console.log(r) })
          window.location.reload();
        }
      }
    } else {
      const reader = new FileReader()
      reader.readAsDataURL(this.ficheiro)
      reader.onload = () => {
        var boas = { user: localStorage.getItem("user"), name: this.ficheiro.name, likes: 0, descricao: event.target.descricao.value, date: new Date(), photo: reader.result as String }
        this.imageService.addPhoto(boas).subscribe(r => { console.log(r) })
        window.location.reload();
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