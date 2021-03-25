import {Component,OnInit}from "@angular/core";
import {UserService} from '../services/user.service';
import {Router,ActivatedRoute,Params} from '@angular/router';


@Component({
    selector: 'home',
    templateUrl:'../views/home.html',
    providers: [UserService]
})

export class HomeComponent implements OnInit{
    public titulo:string;
    public identity;
    
    constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService:UserService
    ){
        this.titulo = 'Artistas';
        this.identity= this._userService.getIdentity();
    }
    ngOnInit(){
        console.log('HOme component list cargando');
    }
}