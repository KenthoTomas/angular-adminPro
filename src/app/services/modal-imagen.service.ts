import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean=true;
  private _imagen:string="";
  
  public tipo:string="";
  public id:string="";
  public img?:string= "";
  
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>;
 
  
  get ocultarModal(){
    return this._ocultarModal;
  }
  get imagenModal(){
    return this._imagen
  }

  cerrarModal(){
    this._ocultarModal=true;
  }

  abrirModal(tipo:'usuarios'|'medico'|'hospital' ,id:string,img:string='no-img'){

  this._ocultarModal=false;
  this.tipo=tipo;
  this.id=id;
  

    if(img.includes('https')){
      return this.img=img;
    }else{
      return console.log(this.img=`${base_url}/uploads/${tipo}/${img}`)
    }

 
    
  }
  
  constructor() { }
}
