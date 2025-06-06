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
  ) { }


  login(email: string, password: string): Observable<{ token: string, userId: string }> {
    return this.http.post<{ token: string, userId: string }>(`${environment.apiBaseUrl}/auth/login`, { email, password });

  }

  signup(userData: { name: string; email: string; password: string }) {
    return this.http.post(`${environment.apiBaseUrl}/auth/register`, userData);
  }



  uploadAvatar(formData: FormData) {
    const token = localStorage.getItem('token');
    return this.http.post(`${environment.apiBaseUrl}/auth/avatar`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }


  getCurrentUserId(): string | null {
    return localStorage.getItem('userId');
  }

  setCurrentUser(user: any): void {
    localStorage.setItem('userId', user._id);
    localStorage.setItem('userAvatar', user.avatar || '');
  }


  getAvatar(): Observable<{ success: boolean, avatar: string }> {
    const token = localStorage.getItem('token');
    return this.http.get<{ success: boolean, avatar: string }>(
      `${environment.apiBaseUrl}/auth/avatar`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }





  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${environment.apiBaseUrl}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })


  }






}
