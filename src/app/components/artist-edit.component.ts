import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { UploadService } from '../services/upload.service';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';


@Component({
    selector: 'artist-edit',
    templateUrl: '../views/artist-add.html',
    providers: [UserService, ArtistService, UploadService]

})

export class ArtistEditComponent implements OnInit {
    public titulo: string;
    public artist: Artist;
    public identity;
    public token;
    public url: string;
    public is_edit;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _uploadService: UploadService,
        private _artistService: ArtistService,
    ) {
        this.titulo = 'Editar artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist('', '', '');
        this.is_edit = true;
    }
    ngOnInit() {
        console.log('artists Edit component cargando');

        this.getArtist();

    }

    onSubmit() {
        console.log(this.artist);
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._artistService.editArtist(this.token, id, this.artist).subscribe(
                response => {
                    // this.artist=response.artist;
                    if (!response.artist) {
                        console.log("Error");
                    } else {
                        console.log("El artista se ha actualizado correctamnete");
                        //    this.artist= response.artist;
                        if (!this.filesToUpload) {
                            this._router.navigate(['/artista', response.artist._id]);
                        } else {

                            this._uploadService.makeFileRequest(this.url + 'upload-image-artist/' + id, [], this.filesToUpload, this.token, 'image').then(
                                (result) => {
                                    this._router.navigate(['/artista', response.artist._id]);
                                    //  this._router.navigate(['/artistas',1]);
                                },
                                (error) => {
                                    console.log("error");
                                }
                            );
                        }
                        // console.log("El artista se ha actualizado");
                    }
                },
                error => {
                    var errorMessage = <any>error;
                    if (errorMessage != null) {
                        var body = (error._body);
                        console.log(error);
                    }
                });
        });

    }


    getArtist() {

        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._artistService.getArtist(this.token, id).subscribe(
                response => {
                    this.artist = response.artist;

                    if (!response.artist) {
                        this._router.navigate(['/'])
                    } else {
                        this.artist = response.artist
                    }
                },
                error => {

                    var errorMessage = <any>error;

                    if (errorMessage != null) {
                        var body = (error._body);
                        //  this.errorMessage =body.errorMessage;
                        console.log(error);
                    }
                }
            );
        })
    }


    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }


}