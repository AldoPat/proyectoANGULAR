import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';
import { HttpParams } from "@angular/common/http";
import Swal from 'sweetalert2';

@Component({
    selector: 'artist-list',
    templateUrl: '../views/artist-list.html',
    providers: [UserService, ArtistService]

})

export class ArtistListComponent implements OnInit {
    public titulo: string;
    public artists: Artist[];
    public identity;
    public token;
    public url: string;
    public next_page;
    public prev_page;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _artistService: ArtistService,
        private _userService: UserService
    ) {
        this.titulo = 'Artistas';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.next_page = 1;
        this.prev_page = 1;
    }
    ngOnInit() {
        console.log('artists component list cargando');
        this.getArtists();
    }

    getArtists() {
        this._route.params.forEach((params: Params) => {
            let page = +params['page'];
            if (!page) {
                page = 1;
            } else {
                this.next_page = page + 1;
                this.prev_page = page - 1;

                if (this.prev_page == 0) {
                    this.prev_page = 1;
                }
            }
            this._artistService.getArtists(this.token, page).subscribe(
                response => {

                    if (!response.artists) {
                        this._router.navigate(['/'])
                    } else {
                        this.artists = response.artists
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
        });
    }

    // public confirmado;
    // onDeleteConfirm(id) {
    //     this.confirmado = id;
    // }
    // onCancelArtist() {
    //     this.confirmado = null;
    // }
    // onDeleteArtist(id) {
    //     this._artistService.deleteArtist(this.token, id).subscribe(
    //         response => {
    //             if (!response.artist) {
    //                 console.log("error en el servidor");
    //             }
    //             this.getArtists();
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
    //     )
    // }

    // public confirmado;
    // onDeleteConfirm(id) {
    //     this.confirmado = id;
    // }
    // onCancelArtist() {
    //     this.confirmado = null;
    // }
    // onDeleteArtist(id) {
    //     this._artistService.deleteArtist(this.token, id).subscribe(
    //         response => {
    //             if (!response.artist) {
    //                 console.log("error en el servidor");
    //             }
    //             this.getArtists();
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
    //     )
    // }

    //  public confirmado;
    // onDeleteConfirm(id) {
    //     this.confirmado = id;
    // }
    // onCancelArtist() {
    //     this.confirmado = null;
    // }
    // onDeleteArtist(id) {
    //     this._artistService.deleteArtist(this.token, id).subscribe(
    //         response => {
    //             if (!response.artist) {
    //                 console.log("error en el servidor");
    //             }
    //             this.getArtists();
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
    //     )
    // }

    onDeleteArtist(id) {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: '¿Estas seguro de que quieres eliminar el Artista?',
            text: "¡Los cambios seran permanentes!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, estoy seguro!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {

            if (result.isConfirmed) {
                this._artistService.deleteArtist(this.token, id).subscribe(
                    response => {
                        if (!response.artist) {
                            console.log("error en el servidor");
                        }
                        this.getArtists();
                    },
                    error => {

                        var errorMessage = <any>error;

                        if (errorMessage != null) {
                            // var body=(error._body);
                            //  this.errorMessage =body.errorMessage;
                            console.log("Error 01");
                        }
                        console.log("Error 02");
                    }
                )
                swalWithBootstrapButtons.fire(
                    'Eliminado!',
                    'El Artista ha sido eliminado con exito!.',
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