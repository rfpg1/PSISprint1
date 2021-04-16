import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo'
import { ImageService } from '../image.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public disabled = false;
  private ficheiro;
  public image;

  constructor(private imageService: ImageService) { }

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
            var boas = { user: 'Eu', name: event.target.name.value, likes: 0, description: event.target.descricao.value, date: new Date(), photo: reader.result as String }
            this.imageService.addPhoto(boas)
          }
        }
      } else {
        const reader = new FileReader()
        reader.readAsDataURL(this.ficheiro)
        reader.onload = () => {
          var boas = { user: 'Eu', name: event.target.name.value, likes: 0, description: event.target.descricao.value, date: new Date(), photo: reader.result as String }
          this.imageService.addPhoto(boas)
        }
      }
    } else if (event.target.descricao.value === "") {
      if (confirm("Quer enviar a imagem sem a descricao")) {
        const reader = new FileReader()
        reader.readAsDataURL(this.ficheiro)
        reader.onload = () => {
          var boas = { user: 'Eu', name: this.ficheiro.name, likes: 0, description: event.target.descricao.value, date: new Date(), photo: reader.result as String }
          this.imageService.addPhoto(boas)
        }
      }
    } else {
      const reader = new FileReader()
      reader.readAsDataURL(this.ficheiro)
      reader.onload = () => {
        var boas = { user: 'Eu', name: this.ficheiro.name, likes: 0, description: event.target.descricao.value, date: new Date(), photo: reader.result as String }
        this.imageService.addPhoto(boas).subscribe();
        this.imageService.getMostRecentImages();
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