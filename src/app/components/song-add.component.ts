import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { SongService } from '../services/song.service';

import { Song } from '../models/song';




@Component({
    selector: 'song-add',
    templateUrl: '../views/song-add.html',
    providers: [UserService, SongService]

})

export class SongAddComponent implements OnInit {
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
        private _songService: SongService,
    ) {
        this.titulo = 'Crear nueva canción';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.song = new Song('', '', '', '', '', '', '');
        // this.is_edit=true;
    }
    ngOnInit() {
        console.log('Song Add component cargando');
        // this._artistService.addArtist();

    }

    onSubmit() {

        this._route.params.forEach((params: Params) => {
            let album_id = params['album'];
            this.song.album = album_id;
            // console.log(this.song);

            this._songService.addSong(this.token, this.song).subscribe(
                response => {
                    // this.artist = response.artist;
                    if (!response.song) {
                        console.log("Error");
                    } else {
                        console.log("la cacnion fue creada Correctamente");
                        this.song = response.song;

                        this._router.navigate(['/editar-tema', response.song._id]);
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
}
