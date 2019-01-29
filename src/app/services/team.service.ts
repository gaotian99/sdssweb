import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of as ObservableOf } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../domain/user.model';
import { Auth } from '../domain/auth.model';
import { Match } from '../domain/match.model';

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
          // console.log(res);
          return res;
        }),
        catchError((err) => {
          return ObservableOf(null);
        })
      );
  }
}
