import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  
   public formSumitted = false;
   
  public registerForm =  this.fb.group({
    nombre: ['Kennth',Validators.required],
    email: ['test100@gmail.com',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(3)]],
    password2:['',[Validators.required, Validators.minLength(3)]],
    terminos:[false,Validators.requiredTrue]

  }, {validators:this.passwordsIguales('password','password2')});
  
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) { }

  crearUsuario(){
    this.formSumitted = true;
    
    console.log(this.registerForm);
    if(this.registerForm.invalid){
      return;
    }

    // realiza posteo
    this.usuarioService.crearUsuario(this.registerForm.value)
    .subscribe(resp=>{
      console.log('usuario creado')
      console.log(resp)
    }, (err)=>{
      //console.warn(err)
      Swal.fire('Error',err.error.msj,'error');
    })
   
  }
 

  campoNoValido(campo: string): boolean{

    if( this.registerForm.get(campo)?.invalid && this.formSumitted) {
      
      
     return true
    }
    else{
      return false;
    }
    
  }


  contraseniasNoValidas(){
    const password1 = this.registerForm.get('password')?.value;
    const password2 = this.registerForm.get('password2')?.value;
    if((password1 !== password2)&& this.formSumitted){
      return true;
    }else{

      return false;
    }
    
  }

  aceptacionTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSumitted
  }
  passwordsIguales(pass1:string, pass2:string){
    return (formGroup:FormGroup)=>{
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if(pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null)
      }else{
        pass2Control?.setErrors({noEsIgual:true})
      }
    }
  }

}
