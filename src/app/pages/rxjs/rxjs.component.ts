import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, retry, take,map,filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() {

    // this.retornaObservable().pipe(
    //   retry(1)
    // ).subscribe(
    //   valor=>console.log('Suscrito',valor),
    //   (err)=>console.warn('error:',err),
    //   ()=>console.info('Obs Terminado')

    //   );

    this.intervalSubs = this.retornaIntervalo().subscribe(
      (valor)=>console.log(valor)
      )
    

   }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

   retornaIntervalo():Observable<number>{
    const interval$ = interval(500).pipe(
    
     
      map(valor=> valor+1),
      filter(valor=>(valor % 2 === 0 )?true:false),
      take(10)
    );
    return interval$;
   }

   retornaObservable():Observable<number>{
        
    let i = -1;
    const obs$ = new Observable<number>(observer=>{
     
      const intervalo = setInterval(()=>{
        
        
         i++;
         observer.next(i);
         if(i===10){
          clearInterval(intervalo);
          observer.complete();
         };
        //  if(i===2){
        //   clearInterval(intervalo);
        //   observer.error('i llego al valor de 2');
        //  }

      },1000)
    });
    return obs$;
      }

  ngOnInit(): void {
  }

}
