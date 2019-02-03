import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of as ObservableOf } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../domain/user.model';
import { TeamUser } from '../domain/teamuser.model';

@Injectable()
export class TeamUserService {

  private readonly domain = 'teamsusers';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }

  getTeamsUsersByIds(teamId: string, userId: string, token: string): Observable<TeamUser[]> {
    const uri = `${this.config.uri}/${this.domain}?filter[where][userID]=${userId}&filter[where][teamID]=${teamId}&access_token=${token}`;
    return this.http
      .get<TeamUser[]>(uri, this.httpOptions).pipe(
        map(res => {
          return res;
        }),
        catchError((err) => {
          return ObservableOf(null);
        })
      );
  }

  getTeamsUsersByTeamId(teamId: string, token: string): Observable<TeamUser[]> {
    const uri = `${this.config.uri}/${this.domain}?filter[where][teamID]=${teamId}&access_token=${token}`;
    return this.http
      .get<TeamUser[]>(uri, this.httpOptions).pipe(
        map(res => {
          return res;
        }),
        catchError((err) => {
          return ObservableOf(null);
        })
      );
  }

  getTeamsUsersByUserId(userId: string, token: string): Observable<TeamUser[]> {
    const uri = `${this.config.uri}/${this.domain}?filter[where][userID]=${userId}&access_token=${token}`;
    return this.http
      .get<TeamUser[]>(uri, this.httpOptions).pipe(
        map(res => {
          return res;
        }),
        catchError((err) => {
          return ObservableOf(null);
        })
      );
  }

}
