import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders,HttpRequest} from '@angular/common/http';
// import {Http,Response,Headers} from '@angular/common/http';
// import {HttpClient,HttpResponse,HttpHeaders,HttpClientModule} from '@angular/common/http';
// import 'rxjs/add/operator/map';
import {map} from "rxjs/operators";
import {Observable} from 'rxjs';
import {GLOBAL} from './global';
import { Artist } from '../models/artist';


@Injectable()
export class UploadService{
    public identity;
    public token;
    public url :string;
    
   constructor(public _http: HttpClient){
       this.url = GLOBAL.url;
   }


   makeFileRequest(url: string,params:Array<string>,files:Array<File>,token:string,name:string){
    
   
  return new Promise(function(resolve,reject){
   var formData:any= new FormData();
   var xhr= new XMLHttpRequest();
   for(var i = 0; i < files.length; i++){
   formData.append(name,files[i],files[i].name);
   }

   xhr.onreadystatechange = function(){
       if(xhr.readyState == 4){
           if(xhr.status==200){
               
               resolve(JSON.parse(xhr.response));
           }
           else{
               reject(xhr.response);    
            }
       }
   }
   xhr.open('POST',url,true);
   xhr.setRequestHeader('Authorization',token);
   xhr.send(formData);
  });
   }


}