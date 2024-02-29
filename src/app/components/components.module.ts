import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { ModalImagenesComponent } from './modal-imagenes/modal-imagenes.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagenesComponent,
  ],
  exports:[
    IncrementadorComponent,
    DonaComponent,
    ModalImagenesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
