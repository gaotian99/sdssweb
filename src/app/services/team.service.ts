import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of as ObservableOf } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Match } from '../domain/match.model';
import { Team } from '../domain/team.model';
import { User } from '../domain';

@Injectable()
export class TeamService {

  private readonly domain = 'teams';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }

  getMatchesByTeamId(teamId: string, token: string): Observable<Match[]> {
    const uri = `${this.config.uri}/${this.domain}/${teamId}/matches?access_token=${token}`;
    return this.http
      .get<Match[]>(uri, this.httpOptions).pipe(
        map(res => {
          return res;
        }),
        catchError((err) => {
          return ObservableOf(null);
        })
      );
  }

  getTeamsByTeamId(teamId: string, token: string): Observable<Team[]> {
    const uri = `${this.config.uri}/${this.domain}/${teamId}?access_token=${token}`;
    return this.http
      .get<Team>(uri, this.httpOptions).pipe(
        map(res => {
          let teams = [];
          return teams.concat(res);
        }),
        catchError((err) => {
          return ObservableOf(null);
        })
      );
  }

  getTeamByTeamId(teamId: string, token: string): Observable<Team> {
    const uri = `${this.config.uri}/${this.domain}/${teamId}?access_token=${token}`;
    return this.http
      .get<Team>(uri, this.httpOptions).pipe(
        map(res => {
          return res;
        }),
        catchError((err) => {
          return ObservableOf(null);
        })
      );
  }

  getTeams(token: string): Observable<Team[]> {
    const uri = `${this.config.uri}/${this.domain}?access_token=${token}`;
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

  getUsersByTeamId(teamId: string, token: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}/${teamId}/users?access_token=${token}`;
    return this.http
      .get<User[]>(uri, this.httpOptions).pipe(
        map(res => {
          return res;
        }),
        catchError((err) => {
          return ObservableOf(null);
        })
      );
  }

}
