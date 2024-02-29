import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number=0;
  public usuarios: Usuario[]=[];
  public usuariosCopia: Usuario[]=[];
  public paginacion:number=0;
  public cargando: boolean=true;
  public buscar: string='';

  public imgSubs!: Subscription;

  constructor(private usuarioService:UsuarioService,
              private busquedaService:BusquedasService,
              private modaImagenServices:ModalImagenService) { }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
   this.cargarUsuarios();
   this.imgSubs= this.modaImagenServices.nuevaImagen
                          .pipe(delay(50))
                          .subscribe(img => this.cargarUsuarios())
  }
  cargarUsuarios(){
    this.cargando=true;
    this.usuarioService.cargarUsuarios(this.paginacion)
    .subscribe((resp:any)=>{

      this.totalUsuarios=resp.total;
      this.usuarios=resp.usuarios;
      this.usuariosCopia=resp.usuarios;
      this.cargando=false;

    })
  }

  cambiarPagina(valor:number){
    this.paginacion+=valor;

    if(this.paginacion<0){
      this.paginacion=0;
    }else if(this.paginacion>=this.totalUsuarios){
      this.paginacion-=valor;
    }
    this.cargarUsuarios()
  }


  buscarUsuario(buscar:string):void{
    if(buscar==''){
       this.usuarios=[...this.usuariosCopia]
    }else{
      this.busquedaService.buscar('usuarios',buscar)
    .subscribe((resp:any)=>{
      this.usuarios=resp.usuarios;


    })
    }

  }

  eliminarUsuario(usuario:Usuario){

   Swal.fire({
    title: "¿Borrar Usuario?",
    text: `Esta a punto de borrar al usuario ${usuario.nombre}`,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si , Eliminar!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.usuarioService.eliminarUsuario(usuario).subscribe(
        (resp:any)=>{
          this.cargarUsuarios()
          Swal.fire({
            title: "Eliminado!",
            text: "Usuario eliminado exitosamente!.",
            icon: "success"
          });
        },(err)=>{
          Swal.fire('Error',err.error.msj,'error')
          console.log(err.error)
        }
      )

    }
  });


  }

  cambiarRole(usuario:Usuario){
    console.log(usuario)
    this.usuarioService.actualizarUsuario(usuario)
    .subscribe(resp=>{
      console.log(resp)
    })

  }
  cambiarImagen(usuario:Usuario){
    this.modaImagenServices.abrirModal('usuarios',usuario.uid!,usuario.img);
    
  }
}
