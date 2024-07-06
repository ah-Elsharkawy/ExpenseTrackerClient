import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Response} from '../Interface/Response';
import { ResetPassword } from '../Interface/ResetPassword';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  userInfo : any;
  userID : any;
  userEmail:BehaviorSubject<string> = new BehaviorSubject("");
  constructor(private _HttpClient : HttpClient) { }

  register(data : any):Observable<any>{
    return this._HttpClient.post(`${this.apiUrl}/services/app/Account/Register`, data);
  }

  login(data : any):Observable<any>{
    return this._HttpClient.post(`${this.apiUrl}/TokenAuth/Authenticate`, data);
  }
  // should return userName
  decodeUser(): void {
    const encode = localStorage.getItem('token');
    if (encode != null) {
      const decode = jwtDecode(encode);
      this.userInfo = decode;
      this.userEmail.next(this.userInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']);
    }
  }
  getUserId():string{
    const encode = localStorage.getItem('token');
    if(encode != null){
      const decode = jwtDecode(encode);
      this.userInfo = decode;
      this.userID = this.userInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      return this.userID;
    }
    return '';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  generateToken(email:string):Observable<Response>{
    return this._HttpClient.get<Response>(`${this.apiUrl}/services/app/User/GetPasswordResetToken?email=${email}`);
  }
  ResetPassword(data : ResetPassword):Observable<Response>{
    return this._HttpClient.post<Response>(`${this.apiUrl}/services/app/User/ResetForgottenPassword`, data);
  }

  activateAccount(Email :string, token:string) : Observable<any> {
    const payload = { email: Email, token: token };
    return this._HttpClient.post(`${this.apiUrl}/services/app/user/ConfirmEmail`, payload);
  }

  getNotifications():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken() // Assuming this.token contains your token
      })
    };
    return this._HttpClient.get(`${this.apiUrl}/services/app/Notification/GetNotifications`, httpOptions);
  }

  updateNotification(id : number):Observable<any>{
    return this._HttpClient.put(`${this.apiUrl}/services/app/Notification/updateNotification?notificationId=${id}`, {});
  }

}
