
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({  
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{


  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`
  }

  @Input() progreso1:number = 0 ;
  @Input() btnClass: string = 'btn-primary';
  
 
  @Output() newItemEvent1 = new EventEmitter<number>();

  get enProgreso() {
   
    return `${this.progreso1}%`;

  }

  cambiaValor(valor:number)
  {
    if(this.progreso1>=100 && valor >=0){
      this.newItemEvent1.emit(100);
      return this.progreso1=100;
    }

    if(this.progreso1<=0 && valor <0){
      this.newItemEvent1.emit(0);
      return this.progreso1=0;  
    }
    this.progreso1=this.progreso1+valor;
    return this.newItemEvent1.emit(this.progreso1);
    
    
  }
  onChange(nuevoValor:number){
    
    if(nuevoValor >=100){
      this.progreso1 =100;
    } else if(nuevoValor <=0){
      this.progreso1 =0;
    }else {
      this.progreso1 = nuevoValor;
    }
    this.newItemEvent1.emit(this.progreso1);
  }
  
}
