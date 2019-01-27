import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable, of as ObservableOf } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../domain/user.model';
import { Auth } from '../domain/auth.model';

@Injectable()
export class AuthService {
  private readonly domain = 'users';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}

  register(user: User): Observable<any> {
    user.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, user, this.httpOptions).pipe(
        map(res => res as User),
        catchError(() => ObservableOf([]))
        );
  }

  login(email: string, password: string): Observable<any> {
    const uri = `${this.config.uri}/${this.domain}/login`;
    return this.http
      .post<any>(uri, {'email': email, 'password': password}, this.httpOptions).pipe(
        map(res => {
          //if(res === null) {
          //  throw 'Email and password does not match';
          //  console.log(res);
          //}
          //console.log(res);
          return {
            id: res.id,
            userId: res.userId,
            ttl: res.ttl
          }
        }),
        catchError((err) => //ObservableOf([]))
        {
          //console.log(err);
          // err.error.error.message
          return ObservableOf([]);
        })
      );
  }
}
