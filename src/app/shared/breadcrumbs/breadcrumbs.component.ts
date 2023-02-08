import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd,  Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public titulo:string ='';
  public tituloSub$:Subscription;

  constructor(private router: Router) {
    this.tituloSub$=this.getDatosRuta().subscribe(
      (data)=>{
        console.log(data);
        this.titulo=data['titulo'];
        document.title=`AdminPro - ${data['titulo']}`  ;
      })
    
   }
  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe();
  }
   getDatosRuta(){
    return this.router.events.pipe(
      filter((event:any)=>event instanceof ActivationEnd),
      filter((event:ActivationEnd)=>event.snapshot.firstChild===null ),
      map((event:ActivationEnd)=>event.snapshot.data)
    )
   }

  ngOnInit(): void {
  }

}
