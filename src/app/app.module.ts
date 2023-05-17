import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';


import { AppComponent } from './app.component';
import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';
import { AuthModule } from './auth/auth.module';
//import { IncrementadorComponent } from './components/incrementador/incrementador.component';



@NgModule({
  declarations: [
    AppComponent,
    NopagesfoundComponent
    
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
