import { Component } from '@angular/core';
@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

  public titulo1:string="General"
  public etiquetas1:string[]= [ 'Emergencias', 'Medicos', 'Usuario' ]
  public data:number []=[ 350, 450, 100];

  public titulo2:string="General"
  public etiquetas2:string[]= [ 'Politraumatismo', 'Covid19', 'Gripe' ]
  public dat2:number []=[ 50, 550, 300];

}
