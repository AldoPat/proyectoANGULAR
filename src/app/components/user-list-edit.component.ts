import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
// import { SongService } from '../services/song.service';
import { UploadService } from '../services/upload.service';
import { User } from '../models/user';




@Component({
    selector: 'user-list-edit',
    templateUrl: '../views/user-list-edit.html',
    providers: [UserService, UploadService]

})

export class UserListEditComponent implements OnInit {
    public titulo: string;

    public user: User;
    public users: User[];
    public identity;
    public token;
    public url: string;
    public is_edit;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _uploadService: UploadService,
        // private _songService: SongService,
    ) {
        this.titulo = 'Editar Usuario';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.user = this.identity;
        // this.user = new User('', '', '', '', '', '', '');
        this.is_edit = true;
    }
    ngOnInit() {
        // console.log('Song Add component cargando');

        this.getUser();

    }

    getUser() {
        console.log("Componente funcionando");

        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._userService.getUser(this.token, id).subscribe(
                response => {
                    // this.artist=response.artist;
                    if (!response.user) {
                        this._router.navigate(['/']);
                        //   console.log("Error");
                    } else {
                        this.user = response.user;
                        // console.log("Album creado Correctamente");
                        // this._uploadService.makeFileRequest(this.url + 'upload-image-user/' + id, [], this.filesToUpload, this.token, 'image')
                        //     .then(
                        //         (result) => {
                        //             this._router.navigate(['/user', response.user]);
                        //         },
                        //         (error) => {
                        //             console.log("Error");
                        //         }
                        //     );
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

        console.log(this.user);

        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._userService.editUser(this.user).subscribe(
                response => {
                    // this.artist=response.artist;
                    if (!response.user) {
                        console.log("Error");
                    } else {
                        // console.log("El artista se ha actualizado correctamnete");
                        //    this.artist= response.artist;

                        // console.log("El artista se ha actualizado");
                        this._router.navigate(['/user-list/1']);
                    }
                },
                error => {
                    var errorMessage = <any>error;
                    if (errorMessage != null) {
                        // var body = (error._body);
                        console.log("error");
                    }
                });
        });

    }

    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }


}
