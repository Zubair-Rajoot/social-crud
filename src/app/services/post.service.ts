import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }


  getAllPosts(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/post/all`);
  }

 
  createPost(postData: FormData): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/post/create`, postData);
  }


  deletePost(postId: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.delete(`${environment.apiBaseUrl}/post/delete/${postId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}


getPostById(id: string): Observable<any> {
  return this.http.get(`${environment.apiBaseUrl}/post/${id}`);
}

updatePost(id: string, postData: FormData): Observable<any> {
  return this.http.put(`${environment.apiBaseUrl}/post/update/${id}`, postData);
}



 

 
}