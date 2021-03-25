import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
// import {Http,Response,Headers} from '@angular/common/http';
// import {HttpClient,HttpResponse,HttpHeaders,HttpClientModule} from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Codigo } from '../models/codigo';


@Injectable()
export class CodigoService {
    public identity;
    public token;
    public url: string;

    constructor(public _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    getCodigos(token, songId = null): Observable<any> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });

        let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
        if (songId == null) {
            return this._http.get(this.url + 'codigos/', httpOptions)
                .pipe(map(res => res));
        } else {
            return this._http.get(this.url + 'codigos/' + songId, httpOptions)
                .pipe(map(res => res));
        }

    }

    getCodigo(token, id: string): Observable<any> {


        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });

        let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };

        return this._http.get(this.url + 'codigo/' + id, httpOptions)
            .pipe(map(res => res));
    }


    addCodigo(token, codigo: Codigo): Observable<any> {
        //    let params=JSON.stringify(artist);
        let params = JSON.stringify(codigo);

        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });


        return this._http.post(this.url + 'codigo', params, { headers: headers }).pipe(map(res => res));
    }

    editCodigo(token, id: string, codigo: Codigo): Observable<any> {
        //    let params=JSON.stringify(artist);
        let params = JSON.stringify(codigo);

        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });


        return this._http.put(this.url + 'codigo/' + id, params, { headers: headers }).pipe(map(res => res));
    }

    deleteCodigo(token, id: string): Observable<any> {


        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });

        let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };

        return this._http.delete(this.url + 'codigo/' + id, httpOptions)
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