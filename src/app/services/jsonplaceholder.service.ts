import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class JsonplaceholderService {


    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
      return this.http.get(`${baseUrl}/posts`);
    }

    getAllJson(): string {
      return JSON.stringify(this.http.get(`${baseUrl}/posts`));
    }

    get(id:number): Observable<any> {
      return this.http.get(`${baseUrl}/posts/${id}`);
    }

    getComments(id:number): Observable<any> {
      return this.http.get(`${baseUrl}/posts/${id}/comments`);
    }

    create(data:any): Observable<any> {
      return this.http.post(`${baseUrl}/posts`, data, {observe: 'response'});
    }

    update(id:number, data:any): Observable<any> {
      return this.http.put(`${baseUrl}/posts/${id}`, data, {observe: 'response'});
    }

    delete(id:number): Observable<any> {
      return this.http.delete(`${baseUrl}/posts/${id}`, {observe: 'response'});
    }

    createComment(data:any): Observable<any> {
      return this.http.post(`${baseUrl}/comments`, data, {observe: 'response'});
    }

    updateComment(id:number, data:any): Observable<any> {
      return this.http.put(`${baseUrl}/comments/${id}`, data, {observe: 'response'});
    }

    deleteComment(id:number): Observable<any> {
      return this.http.delete(`${baseUrl}/comments/${id}`, {observe: 'response'});
    }
}
