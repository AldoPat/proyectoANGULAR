import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
// import {Http,Response,Headers} from '@angular/common/http';
// import {HttpClient,HttpResponse,HttpHeaders,HttpClientModule} from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Artist } from '../models/artist';


@Injectable()
export class ArtistService {
    public identity;
    public token;
    public url: string;

    constructor(public _http: HttpClient) {
        this.url = GLOBAL.url;
    }


    addArtist(token, artist: Artist): Observable<any> {
        //    let params=JSON.stringify(artist);
        let params = JSON.stringify(artist);

        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });


        return this._http.post(this.url + 'artist', params, { headers: headers }).pipe(map(res => res));
    }

    getArtists(token, page): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        };

        return this._http.get(this.url + 'artists/' + page, httpOptions)
            .pipe(map(res => res));



    }


    getArtist(token, id: string): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        };

        return this._http.get(this.url + 'artist/' + id, httpOptions)
            .pipe(map(res => res));


    }


    editArtist(token, id: string, artist: Artist): Observable<any> {
        //    let params=JSON.stringify(artist);
        let params = JSON.stringify(artist);

        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });


        return this._http.put(this.url + 'artist/' + id, params, { headers: headers }).pipe(map(res => res));
    }



    deleteArtist(token, id: string): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        };

        return this._http.delete(this.url + 'artist/' + id, httpOptions)
            .pipe(map(res => res));


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