import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';

import { ArtistService } from '../services/artist.service';
import { AlbumService } from '../services/album.service';
import { Artist } from '../models/artist';
import { Album } from '../models/album';


@Component({
    selector: 'album-add',
    templateUrl: '../views/album-add.html',
    providers: [UserService, ArtistService, AlbumService]

})

export class AlbumAddComponent implements OnInit {
    public titulo: string;
    public artist: Artist;
    public album: Album;
    public identity;
    public token;
    public url: string;
    public is_edit;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _albumService: AlbumService,
        private _artistService: ArtistService,
    ) {
        this.titulo = 'Crear album nuevo';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.album = new Album('', '', '', '', '');
        // this.is_edit=true;
    }
    ngOnInit() {
        console.log('Album Add component cargando');
        // this._artistService.addArtist();
    }

    onSubmit() {
        this._route.params.forEach((params: Params) => {
            let artist_id = params['artist'];
            this.album.artist = artist_id;

            this._albumService.addAlbum(this.token, this.album).subscribe(
                response => {
                    // this.artist = response.artist;
                    if (!response.album) {
                        console.log("Error");
                    } else {
                        console.log("Album creado Correctamente");
                        this.album = response.album;
                        // this._router.navigate(['/editar-artista', response.album._id]);
                        this._router.navigate(['/editar-album', response.album._id]);
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
    filesChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;

    }
}
