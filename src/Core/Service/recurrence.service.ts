import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Recurrence } from '../Interface/Recurrence';

@Injectable({
  providedIn: 'root'
})
export class RecurrenceService {
  private apiUrl = environment.apiUrl;

  private recurrenceSource = new BehaviorSubject<any[]>([]);

  constructor(private _HttpClient:HttpClient ,private Auth:AuthService ) { }

  createRecurrence(data: any): Observable<any> {
    return this._HttpClient.post(`${this.apiUrl}/services/app/Recurrence/CreateRecurrence`, data);
  }

  addRecurrence(recurrence: any) {
    const currentRecurrence = this.recurrenceSource.value;
    if (!currentRecurrence.some(t => t.id === recurrence.id)) { // Assuming each recurrence has a unique 'id'
      this.recurrenceSource.next([...currentRecurrence, recurrence]);
    }
  }
  getUserRecurrences(): Observable<{result:Recurrence[]}> {
    return this._HttpClient.get<{result:Recurrence[]}>(`${this.apiUrl}/services/app/Recurrence/GetRecurrencesForUser?UserId=${this.Auth.getUserId()}`);
  }
  DeleteRecurrence(id: number): Observable<Recurrence> {
    return this._HttpClient.delete<Recurrence>(`${this.apiUrl}/services/app/Recurrence/DeleteRecurrence?id=${id}`);
  }
  UpdateRecurrence(id:number,data: any): Observable<Recurrence> {
    return this._HttpClient.put<Recurrence>(`${this.apiUrl}/services/app/Recurrence/UpdateRecurrence?id=${id}`, data);
  }
}
