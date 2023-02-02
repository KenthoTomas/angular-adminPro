import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function custonIntit():void;
    

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  //public linkTeam = document.querySelector('#theme');
  constructor( private settingsService: SettingsService) { }

  ngOnInit(): void {
    // const themeDefault = './assets/css/colors/default-dark.css';

    // if(!localStorage.getItem('theme')){
    //   this.linkTeam?.setAttribute('href',themeDefault);
    //   console.log('no vino datos del local stora '+ themeDefault)
    // }else{
    // const url = localStorage.getItem('theme');
    // console.log(url+' OBTENIDO DEL LOCAL STORAGE')
    // this.linkTeam?.setAttribute('href',url!);
    // }
    //esta es la forma corta de validacion en caso venga vacio el localStorag
    // const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    // this.linkTeam?.setAttribute('href',url!);

    custonIntit();
    
  }

}
