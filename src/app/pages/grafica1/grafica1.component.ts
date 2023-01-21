import { Component } from '@angular/core';
@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

  public titulo1:string="Ventas"
  public etiquetas1:string[]= [ 'pan', 'soda', 'dulces' ]
  public data:number []=[ 350, 450, 100];

}
