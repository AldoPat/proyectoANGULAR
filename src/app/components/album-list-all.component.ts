import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { AlbumService } from '../services/album.service';
import { ArtistService } from '../services/artist.service';
import { Album } from '../models/album';
import { Artist } from '../models/artist';
import { HttpParams } from "@angular/common/http";

@Component({
    selector: 'artist-list-all',
    templateUrl: '../views/album-list-all.html',
    providers: [UserService, AlbumService, ArtistService]

})

export class AlbumListAllComponent implements OnInit {
    public titulo: string;
    public albums: Album[];
    public artist: Artist;
    public album: Album;
    public identity;
    public token;
    public url: string;
    public next_page;
    public prev_page;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _albumService: AlbumService,
        private _artistService: ArtistService,
        private _userService: UserService
    ) {
        this.titulo = 'Albums';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.next_page = 1;
        this.prev_page = 1;
    }
    ngOnInit() {
        console.log('ALbum component list cargando');
        this.getAlbumsAll();
    }

    getAlbumsAll() {
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
            this._albumService.getAlbumAll(this.token, page).subscribe(
                response => {

                    if (!response.albums) {
                        this._router.navigate(['/'])
                    } else {
                        this.albums = response.albums
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
}