import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[]=[
    {
      titulo:'Principal',
      icono:'mdi mdi-gauge',
      submenu:[
        {titulo:'Main',url: '/'},
        {titulo:'ProgressBar',url:'progress'},
        {titulo:'Graficas',url:'grafica1' },
        {titulo:'Promesas',url:'promesas'},
        {titulo:'rxjs',url:'rxjs'}
      ]

    },
    {
      titulo:'Mantenimietos',
      icono:'mdi mdi-folder-lock-open',
      submenu:[
        {titulo:'Usiarios',url: 'usuarios'},
        {titulo:'Hospitales',url:'hospitales'},
        {titulo:'Medicos',url:'medicos' }
      ]

    }
  ];


  constructor() { }
}
