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
    selector: 'codigo-add',
    templateUrl: '../views/codigo-add.html',
    providers: [UserService, CodigoService, UploadService]

})

export class CodigoAddComponent implements OnInit {
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
        this.titulo = 'Crear Codigo QR nuevo';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.codigo = new Codigo('', '',);
        // this.is_edit=true;
    }
    ngOnInit() {
        console.log('Album Add component cargando');
        // this._artistService.addArtist();
    }



    onSubmit() {

        this._route.params.forEach((params: Params) => {

            /*Obtener el id de la cacnion*/
            let song_id = params['song'];
            let id = params['id'];
            this.codigo.song = song_id;
            console.log(this.codigo);


            this._codigoService.addCodigo(this.token, this.codigo).subscribe(
                response => {
                    // this.artist = response.artist;
                    if (!response.codigo) {
                        console.log("Error");
                    } else {
                        console.log("Codigo creado Correctamente");
                        this.codigo = response.codigo;

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




                        this._router.navigate(['/editar-codigo', response.codigo._id]);

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

    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }
}
