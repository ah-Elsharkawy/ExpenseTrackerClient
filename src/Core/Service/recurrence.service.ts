import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecurrenceService {
  private apiUrl = environment.apiUrl;

  private recurrenceSource = new BehaviorSubject<any[]>([]);

  constructor(private _HttpClient:HttpClient) { }

  createRecurrence(data: any): Observable<any> {
    return this._HttpClient.post(`${this.apiUrl}/services/app/Recurrence/CreateRecurrence`, data);
  }

  addRecurrence(recurrence: any) {
    const currentRecurrence = this.recurrenceSource.value;
    if (!currentRecurrence.some(t => t.id === recurrence.id)) { // Assuming each recurrence has a unique 'id'
      this.recurrenceSource.next([...currentRecurrence, recurrence]);
    }
  }
}
