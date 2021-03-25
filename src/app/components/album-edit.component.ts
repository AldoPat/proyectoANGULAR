import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { UploadService } from '../services/upload.service';
import { AlbumService } from '../services/album.service';
import { Artist } from '../models/artist';
import { Album } from '../models/album';

@Component({
    selector: 'album-edit',
    templateUrl: '../views/album-add.html',
    providers: [UserService, AlbumService, UploadService]

})

export class AlbumEditComponent implements OnInit {
    public titulo: string;
    public album: Album;
    public identity;
    public token;
    public url: string;

    public is_edit;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _uploadService: UploadService,
        private _albumService: AlbumService,
    ) {
        this.titulo = 'Editar album';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.album = new Album('', '', '', '', '');
        this.is_edit = true;
    }
    ngOnInit() {
        console.log('Album Edit component cargando');
        // this._artistService.addArtist();
        this.getAlbum();

    }

    getAlbum() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._albumService.getAlbum(this.token, id).subscribe(
                response => {
                    // this.artist=response.artist;
                    if (!response.album) {
                        this._router.navigate(['/']);
                        //   console.log("Error");
                    } else {
                        this.album = response.album;
                        console.log("Album creado Correctamente");
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
            let id = params['id'];

            this._albumService.editAlbum(this.token, id, this.album).subscribe(
                response => {
                    // this.artist=response.artist;
                    if (!response.album) {
                        console.log("Error");
                    } else {
                        console.log("Album se ha editado Correctamente");
                        if (!this.filesToUpload) {

                            this._router.navigate(['/artista', response.album.artist]);
                            // console.log(response.album);
                        } else {

                            this._uploadService.makeFileRequest(this.url + 'upload-image-album/' + id, [], this.filesToUpload, this.token, 'image')
                                .then(
                                    (result) => {
                                        this._router.navigate(['/artista', response.album.artist]);
                                    },
                                    (error) => {
                                        console.log("Error");
                                    }
                                );
                        }
                        //    this.album= response.album;
                    }
                },
                error => {
                    var errorMessage = <any>error;

                    if (errorMessage != null) {
                        var body = (error._body);
                        //  this.errorMessage =body.errorMessage;
                        console.log("Error en el album");
                    }
                    console.log("eror en el album");
                }
            );
        });

    }
    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;

    }



}
