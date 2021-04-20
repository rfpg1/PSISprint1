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

  clicarFoto() {
    console.log("boas");
  }
/*
  uploadFoto() {
    if (!(this.name === undefined)) {
      if (this.descricao === undefined) {
        if (confirm("Quer enviar a imagem sem a descricao")) {
          const reader = new FileReader()
          reader.readAsDataURL(this.ficheiro)
          reader.onload = () => {
            var boas = { user: localStorage.getItem("user"), name: this.name.value, likes: 0, descricao: "", date: new Date(), photo: reader.result as String }
            this.imageService.addPhoto(boas).subscribe(r => { window.location.reload() })
          }
        }
      } else {
        const reader = new FileReader()
        reader.readAsDataURL(this.ficheiro)
        reader.onload = () => {
          var boas = { user: localStorage.getItem("user"), name: this.name.value, likes: 0, descricao: this.descricao.value, date: new Date(), photo: reader.result as String }
          this.imageService.addPhoto(boas).subscribe(r => { window.location.reload() })
        }
      }
    } else if (this.descricao === undefined) {
      if (confirm("Quer enviar a imagem sem a descricao")) {
        const reader = new FileReader()
        reader.readAsDataURL(this.ficheiro)
        reader.onload = () => {
          var boas = { user: localStorage.getItem("user"), name: this.ficheiro.name, photo: reader.result as String, likes: 0, descricao: "", date: new Date() }
          this.imageService.addPhoto(boas).subscribe(r => { window.location.reload() })
        }
      }
    } else {
      const reader = new FileReader()
      reader.readAsDataURL(this.ficheiro)
      reader.onload = () => {
        var boas = { user: localStorage.getItem("user"), name: this.ficheiro.name, likes: 0, descricao: this.descricao.value, date: new Date(), photo: reader.result as String }
        this.imageService.addPhoto(boas).subscribe(r => { window.location.reload() })
      }
    }
  }
  */

  uploadFoto(){
    const reader = new FileReader()
    reader.readAsDataURL(this.ficheiro)
    reader.onload = () => {
      var boas;
      console.log(this.name)
      console.log(this.descricao)
      if(!(this.name === undefined)){
        if(this.descricao === undefined){
          if (confirm("Quer enviar a imagem sem a descricao")) 
            boas = { user: localStorage.getItem("user"), name: this.name.value, likes: 0, descricao: "", date: new Date(), photo: reader.result as String }
        } else {
          boas = { user: localStorage.getItem("user"), name: this.name.value, likes: 0, descricao: this.descricao, date: new Date(), photo: reader.result as String }
        }
      } else {
        if(this.descricao == undefined){
          if (confirm("Quer enviar a imagem sem a descricao")) 
            boas = { user: localStorage.getItem("user"), name: this.ficheiro.name, likes: 0, descricao: "", date: new Date(), photo: reader.result as String }
        } else {
          boas = { user: localStorage.getItem("user"), name: this.ficheiro.name, likes: 0, descricao: this.descricao, date: new Date(), photo: reader.result as String }
        }
      }
      this.imageService.addPhoto(boas).subscribe(r => { })
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