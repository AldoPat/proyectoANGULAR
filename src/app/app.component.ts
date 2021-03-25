import { Component,OnInit } from '@angular/core';
import { User } from './models/user';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {GLOBAL} from './services/global';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[UserService],
})
export class AppComponent implements OnInit {
  public title = 'Music';
  public user: User; 
  public user_register: User; 
  public identity;
  public token;
  public errorMessage;
  public alertRegister;
  public url:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService:UserService
  )
  {
    this.user=new User('','','','','','ROLE_USER','');
    this.user_register=new User('','','','','','ROLE_USER','');
    this.url = GLOBAL.url;
  }
  ngOnInit(){
//  var texto = this._userService.();
//  console.log(texto);
 this.identity= this._userService.getIdentity();
 this.token=this._userService.getToken();

 console.log(this.identity);
 console.log(this.token);
  }





  public onSubmit(){
    console.log(this.user);
//conseguir los datos del usuario identificado
this._userService.signup(this.user).subscribe(
  response=>{
  // console.log(response);
  let identity = response.user;
  this.identity= identity;
  
  if(!this.identity._id){
   alert("El usuario no es correcto");
  }else{
    //crear en el localstorage para tener el usuario sesion
    localStorage.setItem('identity',JSON.stringify(identity));

    //conseguir el token para enviarselo a cada peticion http
    
    this._userService.signup(this.user,'true').subscribe(
      response=>{
      // console.log(response);
      let token = response.token;
      this.token= token;
      
      if(this.token.lenght<=0){
       alert("El token no se ha generado correctamente");
      }else{
        //Crear elemento en el localstorage para tener token disponible
        localStorage.setItem('token',token);

        // console.log(token);
        // console.log(identity);
        this.user=new User('','','','','','ROLE_USER','');
    
  
      }
      },
    
      error=>{
        var errorMessage=<any>error;
        
        if(errorMessage != null){
          var body=(error._body);
         this.errorMessage =body.errorMessage;
          console.log(error);
        }
      }
    );

  }
  },

  error=>{
    var errorMessage=<any>error;
    
    if(errorMessage != null){
    //   var body=(error._body);
    //  this.errorMessage =body.errorMessage;
      console.log(error);


    //     // var body=JSON.parse(error._body);
    //  this.errorMessage =error;
    //  console.log(error);
    }
  }
);
  }

  logout(){
    // console.log("PUTA MADRE");
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
   localStorage.clear();   
   this.identity=null;
   this.token=null;
   this._router.navigate(['/']);
  }




  onSubmitRegister(){
    console.log(this.user_register);

    this._userService.register(this.user_register).subscribe(
      response =>{
      let user = response.user;
      this.user_register=user;
      

      if(!user._id){
      this.alertRegister= 'Error al registrarte';
      }else{
     this.alertRegister ="Se ha registrado el usuario correctamente, logueate con" + this.user_register.email;
     this.user_register=new User('','','','','','ROLE_USER','');
      }

      },
      error=>{
        var errorMessage=<any>error;
        
        if(errorMessage != null){
          var body=(error._body);
         this.alertRegister =body.message;
          console.log(error);
    
    
        //     // var body=JSON.parse(error._body);
        //  this.errorMessage =error;
        //  console.log(error);
        }
      }
    );
  }
}

