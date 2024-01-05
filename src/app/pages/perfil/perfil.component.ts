import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { SubidaArchivosService } from 'src/app/services/subida-archivos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm!:FormGroup;
  public usuario:Usuario;
  public imagenSubir!:File;
  public imgTemp: any =  '';

  constructor(private usuarioService:UsuarioService ,
              private fb: FormBuilder,
              private subidaArchivos:SubidaArchivosService) { 
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre:[this.usuario.nombre, Validators.required],
      email:[this.usuario.email, [Validators.required, Validators.email]],
    })

  }
  actualizarPerfil(){
  this.usuarioService.actualizarPerfil(this.perfilForm.value)
  .subscribe(()=>{
    this.usuario.nombre = this.perfilForm.value.nombre
    this.usuario.email  = this.perfilForm.value.email
    Swal.fire('Guardado','Se a actualizado el perfil correctamente','success');
    console.log(this.usuario)
  }, (err)=>{
    Swal.fire('Error',err.error.msj,'error')
    console.log(err.error)
  })
  }

  cambiarImagen(event:any){
    
    this.imagenSubir=event.target.files[0];
    if(!event.target.files[0]){
     // return this.imgTemp=null; *se deve de correguir, ya que al momento de cancelar la seleccion de la imagen, no se carga la imagen por *
     return
    }
    const reader = new FileReader();
    const url4 = reader.readAsDataURL(event.target.files[0]);

    reader.onloadend=()=>{
      this.imgTemp=reader.result;
    }
    
  }

  subirImagen(){
    this.subidaArchivos.actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid!)
    .then(img=>{this.usuario.img=img; Swal.fire('Guardado','Se a actualizado el avatar correctamente','success');})
  }

}
