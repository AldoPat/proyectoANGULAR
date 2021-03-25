import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { SongService } from '../services/song.service';
import { Song } from '../models/song';
import { CodigoService } from '../services/codigo.service';
import { Codigo } from '../models/codigo';


@Component({
    selector: 'codigo-detail',
    templateUrl: '../views/codigo-detail.html',
    providers: [UserService, SongService, CodigoService]

})

export class CodigoDetailComponent implements OnInit {


    public song: Song;
    public codigos: Codigo[];
    public codigo: Codigo;
    public identity;
    public token;
    public url: string;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _songService: SongService,
        private _codigoService: CodigoService,
    ) {

        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

        // this.is_edit=true;
    }
    ngOnInit() {
        console.log('Song detail component cargando');

        this.getCodigo();

    }

    // mostrar(): boolean {

    //     if (this.codigo[] > 0) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }



    getCodigo() {
        console.log("El puto metodo funciona");


        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._songService.getSong(this.token, id).subscribe(
                response => {
                    if (!response.song) {

                        /* en caso de que no llegue el id de la cancion redirigir a la home*/
                        this._router.navigate(['/']);
                    } else {
                        this.song = response.song;

                        // Sacar Qr del artista
                        this._codigoService.getCodigos(this.token, response.song._id).subscribe(
                            response => {
                                if (!response.codigos) {
                                    console.log('Esta cancion no tinene codigo qr ');
                                } else {
                                    this.codigos = response.codigos;
                                }
                            },
                            error => {
                                var errorMessage = <any>error;

                                if (errorMessage != null) {
                                    var body = JSON.parse(error._body);
                                    //this.alertMessage = body.message;

                                    console.log("error");
                                }
                            });

                    }
                },
                error => {
                    var errorMessage = <any>error;

                    if (errorMessage != null) {
                        var body = JSON.parse(error._body);
                        //this.alertMessage = body.message;

                        console.log("error");
                    }
                }
            );

        });
    }




    public confirmado;
    onDeleteConfirm(id) {
        this.confirmado = id;

    }
    onCancelCodigo() {
        this.confirmado = null;
    }
    onDeleteSong(id) {
        this._codigoService.deleteCodigo(this.token, id).subscribe(
            response => {
                if (!response.codigo) {
                    console.log("Error en el servidor");
                }

                this.getCodigo();
            },
            error => {
                var errorMessage = <any>error;

                if (errorMessage != null) {
                    // var body=(error._body);
                    //  this.errorMessage =body.errorMessage;
                    console.log("Error");
                }
                console.log("Error");
            }
        );
    }



}