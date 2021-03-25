import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
// import {Http,Response,Headers} from '@angular/common/http';
// import {HttpClient,HttpResponse,HttpHeaders,HttpClientModule} from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Song } from '../models/song';


@Injectable()
export class SongService {
    public identity;
    public token;
    public url: string;

    constructor(public _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    getSongs(token, albumId = null): Observable<any> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });

        let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
        if (albumId == null) {
            return this._http.get(this.url + 'songs/', httpOptions)
                .pipe(map(res => res));
        } else {
            return this._http.get(this.url + 'songs/' + albumId, httpOptions)
                .pipe(map(res => res));
        }

    }

    getSong(token, id: string): Observable<any> {


        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });

        let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };

        return this._http.get(this.url + 'song/' + id, httpOptions)
            .pipe(map(res => res));
    }


    addSong(token, song: Song): Observable<any> {
        //    let params=JSON.stringify(artist);
        let params = JSON.stringify(song);

        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });


        return this._http.post(this.url + 'song', params, { headers: headers }).pipe(map(res => res));
    }

    editSong(token, id: string, song: Song): Observable<any> {
        //    let params=JSON.stringify(artist);
        let params = JSON.stringify(song);

        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });


        return this._http.put(this.url + 'song/' + id, params, { headers: headers }).pipe(map(res => res));
    }

    deleteSong(token, id: string): Observable<any> {


        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });

        let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };

        return this._http.delete(this.url + 'song/' + id, httpOptions)
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