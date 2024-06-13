import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {

  private apiUrl = environment.apiUrl;


  constructor(private _AuthService : AuthService , private _HttpClient : HttpClient) { }

  getProfile(id: string): Observable<any> {
    const token = this._AuthService.getToken();    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._HttpClient.get(`${this.apiUrl}/services/app/User/Profile/?Id=${id}`, { headers });
  }

  updateProfile(id: string, profileData: any): Observable<any> {
    const token = this._AuthService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this._HttpClient.put(`${this.apiUrl}/services/app/User/UpdateProfile`, profileData, { headers });
  }

  changePassword(id: string, passwordData: any): Observable<any> {
    const token = this._AuthService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this._HttpClient.post(`${this.apiUrl}/services/app/User/ChangePassword`, passwordData, { headers });
  }


}
