import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import {tap,map,catchError} from 'rxjs/operators'
import {Observable,of} from 'rxjs'

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuarios } from '../interfaces/cargar-usuarios.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

declare const google: any;

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //varificar mas adelante el porque inconveninte clas 183
  public usuario!: Usuario;


  constructor(private http : HttpClient,
              private router: Router,
              private ngZone: NgZone) {  }


  get token():string{
    return localStorage.getItem('token') || '';
  }

  logout(){
    localStorage.removeItem('token');
    google.accounts.id.revoke('kennethtomas.it@gmail.com', ()=>{
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })

    })
  }


  validarToken(){
    const token = localStorage.getItem('token') || '';

   return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token
      }
    } ).pipe(
      tap((resp:any)=>
      {
        //const {email,google,nombre,role,img,uid} = resp.usuarioDB;
        const email = resp.usuarioDB.email;
        const google=resp.usuarioDB.google;
        const nombre=resp.usuarioDB.nombre;
        const role  =resp.usuarioDB.role;
        const img   =resp.usuarioDB.img;
        const uid   =resp.usuarioDB.uid;

        console.log(resp.usuarioDB.img+' USUARIO DB')
        this.usuario = new Usuario(nombre, email, '',google, img, role, uid);
        console.log(img+'PROPIEDAD DEL USUARIO SERVICE VALIDAR TOKEN')
        localStorage.setItem('token',resp.token);

      }
    ), map(resp=>true),catchError(error=>{
      console.log(error)
      return of  (false);}))

  }

  actualizarPerfil(data:{email:string, nombre:string,role:string}){

    data={
      ...data,
      role:this.usuario.role!
    }

    return this.http.put(`${base_url}/usuarios/${this.usuario.uid}`,data,{
      headers:{
        'x-token':this.token
      }})

  }

  crearUsuario(formData:RegisterForm){
    console.log('creando usuario');
   return this.http.post(`${base_url}/usuarios`,formData)
   .pipe(
    tap((resp:any)=>{
      localStorage.setItem('token',resp.token);
    })
   )
  }

  login(formData:LoginForm){
    console.log('creando usuario01');
   return this.http.post(`${base_url}/login`,formData)
   .pipe(
    tap((resp:any)=>{
      localStorage.setItem('token',resp.token);
      console.log(resp.picture+' LOGIN')
    })
   )
  }

  loginGoogle(token:string){

    return this.http.post(`${base_url}/login/google`,{token})
    .pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token);
        console.log(resp.picture+'usuario.service - loginGoogle')
      })
    )
  }
  cargarUsuarios(desde: number =0){
    return this.http.get<CargarUsuarios>(`${base_url}/usuarios?desde=${desde}`,{
      headers:{
        'x-token':this.token
      }}).pipe(

        map(resp=>{
          const usuarios=resp.usuarios.map(
            user=>new Usuario(user.nombre,user.email,'',user.google,user.img,user.role,user.uid))
          return {
            total: resp.total,
            usuarios
          };
        })
      )
  }
  eliminarUsuario(usuario:Usuario){
    return this.http.delete(`${base_url}/usuarios/${usuario.uid}`,{
      headers:{
        'x-token':this.token
      }})
  }

  actualizarUsuario(data:Usuario){

    return this.http.put(`${base_url}/usuarios/${data.uid}`,data,{
      headers:{
        'x-token':this.token
      }})

  }

}


