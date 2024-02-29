import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { SubidaArchivosService } from 'src/app/services/subida-archivos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagenes',
  templateUrl: './modal-imagenes.component.html',
  styleUrls: ['./modal-imagenes.component.css']
})
export class ModalImagenesComponent implements OnInit {



  constructor(public modalImagenService:ModalImagenService,
              private subidaArchivos:SubidaArchivosService ) { }
  public imagen:any=null;
  public imagenSubir!:File;
  public imgTemp: any = null;


  ngOnInit(): void {
    console.log(this.modalImagenService.imagenModal)
  }
 
 cerrarModal(){
  this.imgTemp=null;
  this.modalImagenService.cerrarModal();
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
    this.subidaArchivos
    .actualizarFoto(this.imagenSubir,'usuarios',this.modalImagenService.id)
    .then(img=>{ 
      Swal.fire('Guardado','Se a actualizado el avatar correctamente','success');
      this.modalImagenService.nuevaImagen.emit(img);
      this.cerrarModal()})
    .catch(err=>{
      console.log(err);
      Swal.fire('Error', 'No se pudo subir la imagen','error')
    })
  }

  

}
