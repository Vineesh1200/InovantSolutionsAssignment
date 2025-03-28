import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginInterface } from '../interfaces/userInterface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private http = inject(HttpClient);

  constructor() { }

  login(formData: LoginInterface): Observable<LoginInterface> {
    const endPoint = `users`;
    return this.http.post<LoginInterface>(endPoint, formData);
  }

}