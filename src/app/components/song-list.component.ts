import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { SongService } from '../services/song.service';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';
import { Song } from '../models/song';
import { CodigoService } from '../services/codigo.service';
import { Codigo } from '../models/codigo';


@Component({
    selector: 'song-list',
    templateUrl: '../views/song-list.html',
    providers: [UserService, SongService, CodigoService, AlbumService]

})

export class SongListComponent implements OnInit {


    public song: Song;
    public codigos: Codigo[];
    public codigo: Codigo;
    public songs: Song[];
    // public album: Album[];
    public album: Album;
    public identity;
    public token;
    public url: string;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _songService: SongService,
        private _codigoService: CodigoService,
        private _albumService: AlbumService,
    ) {

        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

        // this.is_edit=true;
    }
    ngOnInit() {
        console.log('Song detail component cargando');

        this.getCodigo();
        // this.getAlbum();
        // this.getAlbumm();

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

    // getAlbum() {
    //     console.log("MEXICO");
    //     this._route.params.forEach((params: Params) => {
    //         let id = params['id'];

    //         this._albumService.getAlbum(this.token, id).subscribe(
    //             response => {
    //                 if (!response.album) {
    //                     this._router.navigate(['/']);
    //                 } else {
    //                     this.album = response.album;



    // Sacar los albums del artista
    // this._songService.getSongs(this.token, response.album._id).subscribe(
    //     response => {
    //         if (!response.songs) {
    //             console.log('Este album no tiene canciones');
    //         } else {
    //             this.songs = response.songs;
    //         }
    //     },
    //     error => {
    //         var errorMessage = <any>error;

    //         if (errorMessage != null) {
    //             var body = JSON.parse(error._body);
    //             //this.alertMessage = body.message;

    //             console.log("error");
    //         }
    //     });

    //                 }
    //             },
    //             error => {
    //                 var errorMessage = <any>error;

    //                 if (errorMessage != null) {
    //                     // var body = JSON.parse(error._body);
    //                     //this.alertMessage = body.message;

    //                     console.log("error");
    //                 }
    //             }
    //         );

    //     });
    // }


    // getAlbumm() {
    //     // console.log("El metodo funciona");

    //     this._route.params.forEach((params: Params) => {
    //         let id = params['id'];

    //         this._albumService.getAlbum(this.token, id).subscribe(
    //             response => {
    //                 if (!response.album) {
    //                     this._router.navigate(['/']);
    //                 } else {
    //                     this.album = response.album;



    //                     // Sacar los albums del artista
    //                     this._songService.getSongs(this.token, response.album._id).subscribe(
    //                         response => {
    //                             if (!response.songs) {
    //                                 console.log('Este album no tiene canciones');
    //                             } else {
    //                                 this.songs = response.songs;
    //                             }
    //                         },
    //                         error => {
    //                             var errorMessage = <any>error;

    //                             if (errorMessage != null) {
    //                                 var body = JSON.parse(error._body);
    //                                 //this.alertMessage = body.message;

    //                                 console.log("error");
    //                             }
    //                         });

    //                 }
    //             },
    //             error => {
    //                 var errorMessage = <any>error;

    //                 if (errorMessage != null) {
    //                     // var body = JSON.parse(error._body);
    //                     //this.alertMessage = body.message;

    //                     console.log("error");
    //                 }
    //             }
    //         );

    //     });

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