import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
// import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Artist } from '../models/artist';
import { HttpParams } from "@angular/common/http";
// import { FilterPipe } from '../pipes/filter.pipe';
// import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@Component({
    selector: 'user-list',
    templateUrl: '../views/user-list.html',
    providers: [UserService, ArtistService]

})

export class UserListComponent implements OnInit {
    public titulo: string;
    public artists: Artist[];
    public users: User[];
    public identity;
    public token;
    public url: string;
    public next_page;
    public prev_page;
    public filterPost = '';

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,

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

        this.getUsers();

    }


    getUsers() {

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
            this._userService.getUsers(this.token, page).subscribe(
                response => {

                    if (!response.users) {
                        this._router.navigate(['/'])
                    } else {
                        this.users = response.users
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

    public confirmado;
    onDeleteConfirm(id) {
        this.confirmado = id;
    }
    onCancelUser() {
        this.confirmado = null;
    }
    onDeleteUser(id) {
        this._userService.deleteUser(this.token, id).subscribe(
            response => {
                if (!response.user) {
                    console.log("error en el servidor");
                }
                this.getUsers();
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
        )
    }
}