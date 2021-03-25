import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
// import {Http,Response,Headers} from '@angular/common/http';
// import {HttpClient,HttpResponse,HttpHeaders,HttpClientModule} from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Album } from '../models/album';


@Injectable()
export class AlbumService {
    public identity;
    public token;
    public url: string;

    constructor(public _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    getAlbums(token, artistId = null): Observable<any> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });

        let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
        if (artistId == null) {
            return this._http.get(this.url + 'albums/', httpOptions)
                .pipe(map(res => res));
        } else {
            return this._http.get(this.url + 'albums/' + artistId, httpOptions)
                .pipe(map(res => res));
        }

    }

    getAlbum(token, id: string): Observable<any> {


        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });

        let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };

        return this._http.get(this.url + 'album/' + id, httpOptions)
            .pipe(map(res => res));
    }


    addAlbum(token, album: Album): Observable<any> {
        //    let params=JSON.stringify(artist);
        let params = JSON.stringify(album);

        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });


        return this._http.post(this.url + 'album', params, { headers: headers }).pipe(map(res => res));
    }

    editAlbum(token, id: string, album: Album): Observable<any> {
        //    let params=JSON.stringify(artist);
        let params = JSON.stringify(album);

        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });


        return this._http.put(this.url + 'album/' + id, params, { headers: headers }).pipe(map(res => res));
    }

    deleteAlbum(token, id: string): Observable<any> {


        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });

        let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };

        return this._http.delete(this.url + 'album/' + id, httpOptions)
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