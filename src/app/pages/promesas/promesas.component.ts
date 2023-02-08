import { Component, OnInit } from '@angular/core';
import { resolve } from 'chart.js/dist/helpers/helpers.options';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      // const promesa = new Promise((resolve,reject)=>{

      //   if(false){
      //     resolve('Hola Mundo')
      //   }else{
      //     reject('hubo un problema');
      //   }
      
      // });


      // promesa.then((mensaje)=>{
      //   console.log(mensaje);
      // }).catch(error=>{
      //   console.log('Se encontro un error'+error)
      // })

      // console.log('Fin del Init')

   
    this.getUsurio().then(usuarios=>{
      console.log(usuarios)
    });
  }
  getUsurio(){

    const promesa = new Promise(resolve=>{
      fetch('https://reqres.in/api/users')
      .then(resp=>resp.json()).then(body=>console.log(body.data))

    })

    return promesa;
  }

}
