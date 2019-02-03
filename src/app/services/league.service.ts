import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of as ObservableOf } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Team } from '../domain/team.model';

@Injectable()
export class LeagueService {

  private readonly domain = 'Leagues';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }

  getTeamsByLeagueId(LeagueId: string, token: string): Observable<Team[]> {
    const uri = `${this.config.uri}/${this.domain}/${LeagueId}/teams?access_token=${token}`;
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
