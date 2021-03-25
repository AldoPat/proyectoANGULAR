import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';


@Component({
    selector: 'artist-add',
    templateUrl: '../views/artist-add.html',
    providers: [UserService, ArtistService]

})

export class ArtistAddComponent implements OnInit {
    public titulo: string;
    public artist: Artist;
    public identity;
    public token;
    public url: string;
    // public is_edit;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService
    ) {
        this.titulo = 'Crear nuevo artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist('', '', '');
        // this.is_edit=true;
    }
    ngOnInit() {
        console.log('artists ADDD component list cargando');
        // this._artistService.addArtist();
        // this.getArtist();
    }

    onSubmit() {
        console.log(this.artist);
        this._artistService.addArtist(this.token, this.artist).subscribe(
            response => {
                this.artist = response.artist;

                if (!response.artist) {
                    console.log("Error");
                } else {
                    this.artist = response.artist;
                    this._router.navigate(['/editar-artista', response.artist._id]);
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
    }

    // public filesToUpload: Array<File>;
    // filesChangeEvent(fileInput: any) {
    //     this.filesToUpload = <Array<File>>fileInput.target.files;

    // }


}