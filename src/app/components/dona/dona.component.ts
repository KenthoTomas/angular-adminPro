import { Component, Input, SimpleChanges} from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent  {

  @Input() tituloR:string= '';
  @Input() dataR:number[]= [100,200,50];

  @Input('etiquetasR') doughnutChartLabels: string[] = [ 'label1','label2','label33' ];
  
  public doughnutChartData: ChartData <'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: this.dataR},
      
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  ngOnChanges(changes: SimpleChanges): void {
    this.doughnutChartData={
   
      labels: this.doughnutChartLabels,
      datasets:[{ data: this.dataR}]
   
    }
   
  }
  
  prueba(){
    
 
    console.log(this.doughnutChartData.labels);
    console.log(this.doughnutChartData.datasets)
    
  }


}
