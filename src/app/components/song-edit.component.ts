import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { SongService } from '../services/song.service';
import { UploadService } from '../services/upload.service';

import { Song } from '../models/song';




@Component({
    selector: 'song-add',
    templateUrl: '../views/song-add.html',
    providers: [UserService, SongService, UploadService]

})

export class SongEditComponent implements OnInit {
    public titulo: string;

    public song: Song;
    public identity;
    public token;
    public url: string;
    public is_edit;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _uploadService: UploadService,
        private _songService: SongService,
    ) {
        this.titulo = 'Editar nueva canción';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.song = new Song('', '', '', '', '', '', '');
        this.is_edit = true;
    }
    ngOnInit() {
        console.log('Song Add component cargando');
        // this._artistService.addArtist();
        this.getSong();

    }

    getSong() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._songService.getSong(this.token, id).subscribe(
                response => {
                    if (!response.song) {
                        this._router.navigate(['/'])
                    } else {
                        this.song = response.song;
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

        console.log(this.song);
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._songService.editSong(this.token, id, this.song).subscribe(
                response => {

                    if (!response.song) {
                        console.log("Error");

                    } else {
                        if (!this.filesToUpload) {
                            this._router.navigate(['/album', response.song.album]);
                        } else {
                            this._uploadService.makeFileRequest(this.url + 'upload-file-song/' + id, [], this.filesToUpload, this.token, 'file')
                                .then(
                                    (result) => {
                                        this._router.navigate(['/album', response.song.album]);
                                    },
                                    (error) => {
                                        console.log("Error");
                                    }
                                );

                        }
                    }
                    // if (!!this.filesToUpload) {
                    //     if (!this.filesToUpload) {
                    //         this._router.navigate(['/album', response.song.album]);
                    //     } else {

                    //         this._uploadService.makeFileRequest(this.url + 'upload-image-song/' + id, [], this.filesToUpload, this.token, 'image')
                    //             .then(
                    //                 (result) => {
                    //                     this._router.navigate(['/album', response.song.album]);
                    //                 },
                    //                 (error) => {
                    //                     console.log("Error DE LA IMAGEN");
                    //                 }
                    //             );



                    //   this._router.navigate(['/editar-album', response.album._id]);





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


    public filesToUpload;
    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
    // public filesToUploadImage: Array<File>;
    // filesChangeEvent(fileInput: any) {
    //     this.filesToUploadImage = <Array<File>>fileInput.target.files;

    // }
}
