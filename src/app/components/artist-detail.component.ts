import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';

import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';
import Swal from 'sweetalert2';

@Component({
    selector: 'artist-detail',
    templateUrl: '../views/artist-detail.html',
    providers: [UserService, ArtistService, AlbumService]

})

export class ArtistDetailComponent implements OnInit {

    public artist: Artist;
    public albums: Album[];
    public identity;
    public token;
    public url: string;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService,
        private _albumService: AlbumService,
    ) {

        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

        // this.is_edit=true;
    }
    ngOnInit() {
        console.log('artists Edit component cargando');
        // this._artistService.addArtist();
        this.getArtist();

    }


    getArtist() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._artistService.getArtist(this.token, id).subscribe(
                response => {
                    if (!response.artist) {
                        this._router.navigate(['/']);
                    } else {
                        this.artist = response.artist;

                        // Sacar los albums del artista
                        this._albumService.getAlbums(this.token, response.artist._id).subscribe(
                            response => {
                                if (!response.albums) {
                                    console.log('Este artista no tiene albums');
                                } else {
                                    this.albums = response.albums;
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


    onDeleteAlbum(id) {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: '¿Estas seguro de que quieres eliminar el Album?',
            text: "¡Los cambios seran permanentes!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, estoy seguro!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                this._albumService.deleteAlbum(this.token, id).subscribe(
                    response => {
                        if (!response.album) {
                            console.log("Error en el servidor");
                        }

                        this.getArtist();
                    },
                    error => {
                        var errorMessage = <any>error;

                        if (errorMessage != null) {
                            // var body=(error._body);
                            //  this.errorMessage =body.errorMessage;
                            console.log("Error");
                        }
                        console.log("Error");
                    }
                );
                swalWithBootstrapButtons.fire(
                    'Eliminado!',
                    'El Album ha sido eliminado con exito!.',
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




}