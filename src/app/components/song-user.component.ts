import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';

// import { ArtistService } from '../services/artist.service';
// import { Artist } from '../models/artist';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';


@Component({
    selector: 'song-user',
    templateUrl: '../views/song-user.html',
    providers: [UserService, AlbumService]
    // , ArtistService
})

export class SongUserComponent implements OnInit {

    // public artist: Artist;
    public Album: Album;
    public identity;
    public token;
    public url: string;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        // private _artistService: ArtistService,
        private _albumService: AlbumService,
    ) {

        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

        // this.is_edit=true;
    }
    ngOnInit() {
        console.log('Song USer component cargando');
        // this._artistService.addArtist();
        this.getAlbum();

    }


    getAlbum() {
        console.log("HOLA MUNDO");
        // this._route.params.forEach((params: Params) => {
        //     let id = params['id'];

        //     this._artistService.getArtist(this.token, id).subscribe(
        //         response => {
        //             if (!response.artist) {
        //                 this._router.navigate(['/']);
        //             } else {
        //                 this.artist = response.artist;

        //                 // Sacar los albums del artista
        //                 this._albumService.getAlbums(this.token, response.artist._id).subscribe(
        //                     response => {
        //                         if (!response.albums) {
        //                             console.log('Este artista no tiene albums');
        //                         } else {
        //                             this.albums = response.albums;
        //                         }
        //                     },
        //                     error => {
        //                         var errorMessage = <any>error;

        //                         if (errorMessage != null) {
        //                             var body = JSON.parse(error._body);
        //                             //this.alertMessage = body.message;

        //                             console.log("error");
        //                         }
        //                     });

        //             }
        //         },
        //         error => {
        //             var errorMessage = <any>error;

        //             if (errorMessage != null) {
        //                 var body = JSON.parse(error._body);
        //                 //this.alertMessage = body.message;

        //                 console.log("error");
        //             }
        //         }
        //     );

        // });
    }


    // onDeleteAlbum(id) {
    //     this._albumService.deleteAlbum(this.token, id).subscribe(
    //         response => {
    //             if (!response.album) {
    //                 console.log("Error en el servidor");
    //             }
    //             this.getArtist();
    //         },
    //         error => {
    //             var errorMessage = <any>error;

    //             if (errorMessage != null) {
    //                 var body = JSON.parse(error._body);
    //                 //this.alertMessage = body.message;

    //                 console.log("error");
    //             }
    //             console.log("error");
    //         }
    //     );
    // }

    // public confirmado;
    // onDeleteConfirm(id) {
    //     this.confirmado = id;

    // }
    // onCancelAlbum() {
    //     this.confirmado = null;
    // }
    // onDeleteAlbum(id) {
    //     this._albumService.deleteAlbum(this.token, id).subscribe(
    //         response => {
    //             if (!response.album) {
    //                 console.log("Error en el servidor");
    //             }

    //             this.getArtist();
    //         },
    //         error => {
    //             var errorMessage = <any>error;

    //             if (errorMessage != null) {
    //                 // var body=(error._body);
    //                 //  this.errorMessage =body.errorMessage;
    //                 console.log("Error");
    //             }
    //             console.log("Error");
    //         }
    //     );
    // }

    startPlayer(song) {
        let song_player = JSON.stringify(song);
        let file_path = this.url + 'get-song-file/' + song.file;
        let image_path = this.url + 'get-image-album/' + song.album.image;

        localStorage.setItem('sound_song', song_player);

        document.getElementById("mp3-source").setAttribute("src", file_path);
        (document.getElementById("player") as any).load();
        (document.getElementById("player") as any).play();

        document.getElementById('play-song-title').innerHTML = song.name;
        document.getElementById('play-song-artist').innerHTML = song.album.artist.name;
        document.getElementById('play-image-album').setAttribute('src', image_path);

    }


}