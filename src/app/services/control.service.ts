import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private apiUrl = 'http://localhost:8080/control';

  constructor(private http: HttpClient) {}

  sendCommand(command: string): Observable<any> {
    return this.http.post(this.apiUrl, { command });
  }
}
