import { Component  } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'
  ]
})
export class ProgressComponent  {


  datosBarra1:number =50;
  datosBarra2:number =25;
  get getDatosBarra1()
  { 
    return  `${this.datosBarra1}%`;
  }
  get getDatosBarra2()
  { 
    return  `${this.datosBarra2}%`;
  }
 

}
