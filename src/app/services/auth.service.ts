import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private router: Router
  ) {}

  
  login(email: string, password: string): Observable<{ token: string }> {
   return this.http.post<{ token: string }>(`${environment.apiBaseUrl}/auth/login`, { email, password });
  }

  signup(userData: { name: string; email: string; password: string }) {
    return this.http.post(`${environment.apiBaseUrl}/auth/register`, userData);
  }


}
