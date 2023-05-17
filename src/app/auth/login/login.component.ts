import { Component, AfterViewInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit  {

  //Tener en cuenta que se le forzo la inicializacion con el "!"
  @ViewChild('googleBtn') googleBtn!: ElementRef;
  
  public formSumitted = false;
   
  public loginform:FormGroup =  this.fb.group({
    
    email: [localStorage.getItem('email')||'',[Validators.required, Validators.email]],
    password:['',Validators.required],
    remember: [false]

  });


  constructor(private router:Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone) { }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "384332402520-4v1p3psbopgro4a5tnfpquuv5in0bffn.apps.googleusercontent.com",
      callback: (response:any)=>this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response:any){
    //console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential).subscribe(
      resp=>{
       // console.log({login:resp})

       this.ngZone.run(()=>{
        this.router.navigateByUrl('/');
       })
        
      }
    )
  }

  login(){
   // console.log(this.loginform.value);
    this.usuarioService.login(this.loginform.value)
    .subscribe(resp=>{

      if(this.loginform.get('remember')?.value){
        localStorage.setItem('email',this.loginform.get('email')?.value);
      }
      else{
        localStorage.removeItem('email');
      }
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/');
      })
      
      console.log(resp)
    },(err)=>{
      Swal.fire('Error',err.error.mjs,'error')
    })
   // this.router.navigateByUrl('/');
  }
}
