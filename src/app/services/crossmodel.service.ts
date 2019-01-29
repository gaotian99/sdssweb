import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of as ObservableOf } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Match, MatchAccessLevel } from 'src/app/domain/match.model';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/domain/user.model';
import { Team } from 'src/app/domain/team.model';
import { TeamService } from 'src/app/services/team.service';
import { MatchService } from 'src/app/services/match.service';
import { LeagueService } from './league.service';

@Injectable()
export class CrossModelService {

  //private readonly domain = 'teams';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private userService: UserService,
    private teamService: TeamService,
    private matchService: MatchService,
    private leagueService: LeagueService,
    @Inject('BASE_CONFIG') private config) { }

  //0=guest, 1=player, 2=team, 3=league, 4=globle
  getTeamsByLevel(id: string, token: string, level: number): Observable<Team[]> {
    if (level == 0 || level == 1) {
      return this.userService.getTeamsByUserId(id, token);
    }
    if (level == 2) {
      return this.teamService.getTeamsByTeamId(id, token);
    }
    if (level == 3) {
      return this.leagueService.getTeamsByLeagueId(id, token);
    }
    return this.teamService.getTeams(token);
  }

}
