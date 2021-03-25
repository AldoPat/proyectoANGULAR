import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { CodigoService } from '../services/codigo.service';
import { ArtistService } from '../services/artist.service';
import { UploadService } from '../services/upload.service';
import { Artist } from '../models/artist';
import { Codigo } from '../models/codigo';


@Component({
    selector: 'codigo-edit',
    templateUrl: '../views/codigo-add.html',
    providers: [UserService, CodigoService, UploadService]

})

export class CodigoEditComponent implements OnInit {
    public titulo: string;

    public codigo: Codigo;
    public identity;
    public token;
    public url: string;
    public is_edit;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _codigoService: CodigoService,
        private _uploadService: UploadService,
    ) {
        this.titulo = 'Editar Codigo QR nuevo';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.codigo = new Codigo('', '',);
        this.is_edit = true;
    }
    ngOnInit() {
        console.log('Album Add component cargando');
        // this._artistService.addArtist();
        this.getCodigo();
    }
    getCodigo() {
        this._route.params.forEach((params: Params) => {
            let id = params['id']
            this._codigoService.getCodigo(this.token, id).subscribe(
                response => {
                    if (!response.codigo) {
                        this._router.navigate(['/']);
                    } else {
                        this.codigo = response.codigo;
                    }

                },
                error => {
                    var errorMessage = <any>error;

                    if (errorMessage != null) {
                        var body = (error._body);
                        //  this.errorMessage =body.errorMessage;
                        console.log("Error");
                    }
                }
            );
        });
    }



    onSubmit() {

        this._route.params.forEach((params: Params) => {

            /*Obtener el id de la cacnion*/
            let id = params['id'];



            this._codigoService.editCodigo(this.token, id, this.codigo).subscribe(
                response => {
                    // this.artist = response.artist;
                    if (!response.codigo) {
                        console.log("Error");
                    } else {
                        console.log("Codigo actualizada Correctamente");


                        //    this._router.navigate(['/editar-album', response.album._id]);
                        //    this._router.navigate(['/editar-album', response.album._id]);


                        if (!this.filesToUpload) {
                            console.log("Error en el servidor");
                        } else {

                            this._uploadService.makeFileRequest(this.url + 'upload-image-codigo/' + id, [], this.filesToUpload, this.token, 'image')
                                .then(
                                    (result) => {
                                        this._router.navigate(['/song', response.codigo.song]);
                                    },
                                    (error) => {
                                        console.log("Error");
                                    }
                                );
                        }



                    }
                },
                error => {
                    var errorMessage = <any>error;

                    if (errorMessage != null) {
                        var body = (error._body);
                        //  this.errorMessage =body.errorMessage;
                        console.log("Error");
                    }
                }
            );

        });

    }



    // public filesToUpload: Array<File>;
    // filesChangeEvent(fileInput: any) {
    //     this.filesToUpload = <Array<File>>fileInput.target.files;

    // }
    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }
}
