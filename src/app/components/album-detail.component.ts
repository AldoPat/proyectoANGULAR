import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { AlbumService } from '../services/album.service';
import { SongService } from '../services/song.service';
import { Album } from '../models/album';
import { Song } from '../models/song';
import Swal from 'sweetalert2';



@Component({
    selector: 'album-detail',
    templateUrl: '../views/album-detail.html',
    providers: [UserService, AlbumService, SongService]

})

export class AlbumDetailComponent implements OnInit {


    public album: Album[];
    public songs: Song[];
    public identity;
    public token;
    public url: string;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _albumService: AlbumService,
        private _songService: SongService,

    ) {

        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

        // this.is_edit=true;
    }
    ngOnInit() {
        // console.log('Album Edit component cargando');
        //Sacar album de la bddd
        this.getAlbum();

    }


    getAlbum() {
        // console.log("El metodo funciona");

        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._albumService.getAlbum(this.token, id).subscribe(
                response => {
                    if (!response.album) {
                        this._router.navigate(['/']);
                    } else {
                        this.album = response.album;



                        // Sacar los albums del artista
                        this._songService.getSongs(this.token, response.album._id).subscribe(
                            response => {
                                if (!response.songs) {
                                    console.log('Este album no tiene canciones');
                                } else {
                                    this.songs = response.songs;
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
                        // var body = JSON.parse(error._body);
                        //this.alertMessage = body.message;

                        console.log("error");
                    }
                }
            );

        });

    }


    // public confirmado;
    // onDeleteConfirm(id) {
    //     this.confirmado = id;
    // }

    // onCancelSong() {
    //     this.confirmado = null;
    // }

    // onDeleteSong(id) {
    //     this._songService.deleteSong(this.token, id).subscribe(
    //         response => {
    //             if (!response.song) {
    //                 // alert('Error ene el servidor');
    //                 console.log("Error ene el servidor");
    //             }

    //             this.getAlbum();
    //         },
    //         error => {
    //             var errorMessage = <any>error;

    //             if (errorMessage != null) {
    //                 var body = JSON.parse(error._body);
    //                 //this.alertMessage = body.message;

    //                 console.log("Error");
    //             }
    //         }
    //     );
    // }


    onDeleteSong(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: '¿Estas seguro de que quieres eliminar la cancion?',
            text: "¡Los cambios seran permanentes!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, estoy seguro!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                this._songService.deleteSong(this.token, id).subscribe(
                    response => {
                        if (!response.song) {
                            // alert('Error ene el servidor');
                            console.log("Error ene el servidor");
                        }

                        this.getAlbum();
                    },
                    error => {
                        var errorMessage = <any>error;

                        if (errorMessage != null) {
                            var body = JSON.parse(error._body);
                            //this.alertMessage = body.message;

                            console.log("Error");
                        }
                    }
                );



                swalWithBootstrapButtons.fire(
                    'Eliminado!',
                    'La cancion ha sido eliminado con exito!.',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'La accion de eliminar ha sido cancelada',
                    'El archivo esta a salvo :)',
                    'error'
                )
            }
        })


    }


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