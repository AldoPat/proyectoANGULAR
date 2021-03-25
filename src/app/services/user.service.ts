import { Injectable } from '@angular/core';
// import {Http,Response,Headers} from '@angular/common/http';
// import {HttpClient,HttpResponse,HttpHeaders,HttpClientModule} from '@angular/common/http';

import { HttpClient, HttpHeaders } from '@angular/common/http';

// import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { GLOBAL } from './global';


@Injectable()
export class UserService {
    public identity;
    public token;
    public url: string;

    constructor(public _http: HttpClient) {
        this.url = GLOBAL.url;
    }


    signup(user_to_login, gethash = null): Observable<any> {
        if (gethash != null) {
            user_to_login.gethash = gethash;
        }

        let json = JSON.stringify(user_to_login);
        let params = json;

        //   let headers = new Headers({'Content Type':'application/json'});
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'login', params, { headers: headers }).pipe(map(res => res));

    }

    register(user_to_register): Observable<any> {
        let params = JSON.stringify(user_to_register);

        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'register', params, { headers: headers }).pipe(map(res => res));

    }

    updateUser(user_to_update): Observable<any> {
        let params = JSON.stringify(user_to_update);

        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.put(this.url + 'update-user/' + user_to_update._id, params, { headers: headers }).pipe(map(res => res));

    }
    getUsers(token, page): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        };

        return this._http.get(this.url + 'users/' + page, httpOptions)
            .pipe(map(res => res));

    }
    getUser(token, id: string): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        };

        return this._http.get(this.url + 'user/' + id, httpOptions)
            .pipe(map(res => res));


    }

    editUser(user_to_update): Observable<any> {
        //    let params=JSON.stringify(artist);
        let params = JSON.stringify(user_to_update);

        // let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.getToken() });
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());

        return this._http.put(this.url + 'user/' + user_to_update._id, params, { headers: headers }).pipe(map(res => res));
    }

    deleteUser(token, id: string): Observable<any> {


        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });

        let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };

        return this._http.delete(this.url + 'user/' + id, httpOptions)
            .pipe(map(res => res));
    }
    getIdentity(): Observable<any> {
        let identity = JSON.parse(localStorage.getItem('identity'));
        if (identity != "undifined") {
            this.identity = identity;
        } else {
            this.identity = null;
        }
        return this.identity;
    }

    getToken() {

        let token = localStorage.getItem('token');

        if (token != "undefined") {
            this.token = token;

        } else {
            this.token = null;
        }
        return this.token;
    }
}







// signup(user_to_login:any,gethash=null):Observable<any>{
//     if(gethash != null){
//         user_to_login.gethash=gethash;
//     }


//      let json=JSON.stringify(user_to_login);
//      let params = "json="+json;


//      let headers = new HttpHeaders().set('Content-Type', 'application/json');
//      return this._http.post(this.url+'login',params,{headers:headers}).pipe(map(res => res));

//  }