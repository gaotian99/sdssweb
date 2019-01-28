import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of as ObservableOf } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../domain/user.model';
import { Auth } from '../domain/auth.model';
import { Team } from '../domain/team.model';

@Injectable()
export class UserService {
  private readonly domain = 'users';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }

  getOneUserInfo(auth: Auth): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}/${auth.userId}?access_token=${auth.id}`;
    return this.http
      .get<User>(uri, this.httpOptions).pipe(
        map(res => {
          return {
            userId: auth.userId,
            id: auth.id,
            ttl: auth.ttl,
            user:
            {
              id: res.id,
              email: res.email,
              password: res.password,
              name: res.name,
              avatar: res.avatar,
              age: res.age,
              sex: res.sex,
              phoneNumber: res.phoneNumber,
              role: res.role,
              description: res.description
            }
          }
        }),
        catchError((err) => {
          return ObservableOf(null);
        })
      );
  }

  getOneUserById(userId: string, token: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${userId}?access_token=${token}`;
    return this.http
      .get<User>(uri, this.httpOptions).pipe(
        map(res => {
          return {
            id: res.id,
            email: res.email,
            password: res.password,
            name: res.name,
            avatar: res.avatar,
            age: res.age,
            sex: res.sex,
            phoneNumber: res.phoneNumber,
            role: res.role,
            description: res.description
          }
        }),
        catchError((err) => {
          return ObservableOf(null);
        })
      );
  }

  getOneTeamByUserId(userId: string, token: string): Observable<Team> {
    const uri = `${this.config.uri}/${this.domain}/${userId}/teams?access_token=${token}`;
    return this.http
      .get<Team[]>(uri, this.httpOptions).pipe(
        map(res => {
          return res[0];
        }),
        catchError((err) => {
          return ObservableOf(null);
        })
      );
  }

  getTeamsByUserId(userId: string, token: string): Observable<Team[]> {
    const uri = `${this.config.uri}/${this.domain}/${userId}/teams?access_token=${token}`;
    return this.http
      .get<Team[]>(uri, this.httpOptions).pipe(
        map(res => {
          return res;
        }),
        catchError((err) => {
          return ObservableOf(null);
        })
      );
  }


}
