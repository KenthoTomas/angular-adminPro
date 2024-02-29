import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import {map} from 'rxjs/operators'

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { BuscarUsuario } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})


export class BusquedasService {

  constructor(private http : HttpClient,
    private router: Router,
    private ngZone: NgZone) {  }


    get token():string{
      return localStorage.getItem('token') || '';
    }
    get headers(){
      return {
        headers:{
          'x-token':this.token
        }
      }
    }

    buscar(tipo:'usuarios'|'medicos'|'hospitales',termino:string=''){
      return this.http.get<BuscarUsuario>(`${base_url}/todo/coleccion/${tipo}/${termino}`,this.headers)
      .pipe(
        map(resp=>{
          const usuarios=resp.resultados.map(
            user=>new Usuario(user.nombre,user.email,'',user.google,user.img,user.role,user.uid))
          return {
            
            usuarios
          };
        })
      )
    }
}
