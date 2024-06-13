import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  userInfo : any;
  userID : any;

  constructor(private _HttpClient : HttpClient) { }

  register(data : any):Observable<any>{
    return this._HttpClient.post(`${this.apiUrl}/services/app/Account/Register`, data);
  }

  login(data : any):Observable<any>{
    return this._HttpClient.post(`${this.apiUrl}/TokenAuth/Authenticate`, data);
  }

  decodeUser():void {
    const encode = localStorage.getItem('token');
    if(encode != null){
      const decode = jwtDecode(encode);
      this.userInfo = decode;
      //console.log(decode);
    } 
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }



}
