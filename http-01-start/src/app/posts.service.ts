import { Injectable } from '@angular/core';
import { baseUrl } from './endpoint';
import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Post } from './post.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();
  constructor(private http: HttpClient) {}
  createAndStorePost(title: string, content: string) {
    const postData: Post = {
      title,
      content,
    };
    this.http
      .post<{ name: string }>(baseUrl + '/posts.json', postData, {
        observe: 'response',
      })
      .subscribe(
        (response) => console.log(response),
        (error) => this.error.next(error.message)
      );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('print2', 'pretty2');
    return this.http
      .get<{ [key: string]: Post }>(baseUrl + '/posts.json', {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
        params: searchParams,
      })
      .pipe(
        map((response) => {
          if (!response) return [];
          return Object.keys(response).map((key) => ({
            id: key,
            ...response[key],
          }));
        }),
        catchError((error) => {
          // send error to analytics or sth
          return throwError(error);
        })
      );
  }

  deletePosts() {
    return this.http
      .delete(baseUrl + '/posts.json', {
        observe: 'events',
        responseType: 'text',
      })
      .pipe(
        tap((event) => {
          if (event.type == HttpEventType.Sent) console.log(event);
        })
      );
  }
}
