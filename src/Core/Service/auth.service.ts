import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo : any;

  constructor(private _HttpClient : HttpClient) { }

  register(data : any):Observable<any>{
    return this._HttpClient.post('https://localhost:44311/api/services/app/Account/Register',data)
  }

  login(data : any):Observable<any>{
    return this._HttpClient.post('https://localhost:44311/api/TokenAuth/Authenticate',data)
  }

  decodeUser():void {
    const encode = localStorage.getItem('token');
    if(encode != null){
      const decode = jwtDecode(encode);
      this.userInfo = decode;
      //console.log(decode);
    } 
  }



}
