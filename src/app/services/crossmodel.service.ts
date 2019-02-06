import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, of as ObservableOf, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Match, MatchAccessLevel } from 'src/app/domain/match.model';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/domain/user.model';
import { Team } from 'src/app/domain/team.model';
import { TeamService } from 'src/app/services/team.service';
import { MatchService } from 'src/app/services/match.service';
import { LeagueService } from './league.service';
import { TeamUserService } from './teamuser.service';
import { TeamUser } from '../domain/teamuser.model';

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
    private teamUserService: TeamUserService,
    @Inject('BASE_CONFIG') private config) { }

  // 0=guest, 1=player, 2=team, 3=league, 4=globle
  getTeamsByLevel(id: string, token: string, level: number): Observable<Team[]> {
    if (level == 1) {
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

  // 0=guest, 1=player, 2=team, 3=league, 4=globle
  getUsersByLevel(id: string, token: string, level: number): Observable<User[]> {
    if (level == 1) {
      return this.userService.getUsersById(id, token);
    }
    if (level == 2) {
      return this.teamService.getUsersByTeamId(id, token);
    }
    if (level == 3) {
      return this.getUsersByLeagueId(id, token);
    }
    return this.userService.getUsers(token);
  }

  // 0=guest, 1=player, 2=team, 3=league, 4=globle
  getUsersAndPositionByLevel(id: string, token: string, level: number): Observable<User[]> {
    if (level == 1) {
      return this.getUsersAndPositionByUserId(id, token);
    }
    if (level == 2) {
      return this.getUsersAndPositionByTeamId(id, token);
    }
    if (level == 3) {
      return this.getUsersAndPositionByLeagueId(id, token);
    }
    return this.userService.getUsers(token);
  }

  // 0=guest, 1=player, 2=team, 3=league, 4=globle
  getTeamUsersByLevel(userId: string, id: string, token: string, level: number): Observable<TeamUser[]> {
    if (level == 1) {
      return this.teamUserService.getTeamsUsersByUserId(userId, token);
    }
    if (level == 2) {
      return this.teamUserService.getTeamsUsersByIds(id, userId, token);
    }
    return null; // dangous
  }


  getUsersByLeagueId(leagueId: string, token: string): Observable<User[]> {
    let leaguePlayers: User[] = [];
    if (leagueId === null) return ObservableOf(leaguePlayers);
    this.leagueService.getTeamsByLeagueId(leagueId, token)
      .subscribe(teams => {
        teams.forEach(team => {
          this.teamService.getUsersByTeamId(team.id, token)
            .subscribe(users => {
              leaguePlayers = leaguePlayers.concat(users);
            });
        });
        return ObservableOf(leaguePlayers);
      });
  }

  getUsersAndPositionByTeamId(teamId: string, token: string): Observable<User[]> {
    let playersWithPosition: User[] = [];
    if (teamId === null) return ObservableOf(playersWithPosition);
    this.teamService.getUsersByTeamId(teamId, token).subscribe((users) => {
      users.forEach((user) => {
        this.teamUserService.getTeamsUsersByIds(teamId, user.id, token).subscribe((teamusers) => {
          teamusers.forEach((teamuser) => {
            let userWP: User = {
              // id: user.id,
              // email: user.email,
              name: user.name,
              avatar: user.avatar,
              age: user.age,
              sex: user.sex,
              phoneNumber: user.phoneNumber,
              role: user.role,
              position: teamuser.position,
            };
            playersWithPosition.push(userWP);
            //console.log(userWP);
          })
        })
      })
    });
    //console.log(playersWithPosition);
    return of(playersWithPosition);
  }


  getUsersAndPositionByLeagueId(leagueId: string, token: string): Observable<User[]> {
    let playersWithPosition: User[] = [];
    if (leagueId === null) return ObservableOf(playersWithPosition);
    this.leagueService.getTeamsByLeagueId(leagueId, token).subscribe((teams) => {
      teams.forEach((team) => {
        this.getUsersAndPositionByTeamId(team.id, token).subscribe((users) => {
          playersWithPosition.concat(users);
        })
      })
    });
    return ObservableOf(playersWithPosition);
  }

  getUsersAndPositionByUserId(userId: string, token: string): Observable<User[]> {
    let playersWithPosition: User[] = [];
    if (userId === null) return ObservableOf(playersWithPosition);
    this.teamUserService.getTeamsUsersByUserId(userId, token).subscribe((teamusers) => {
      // console.log(teamusers);
      teamusers.forEach((teamuser) => {
        this.userService.getOneUserById(userId, token).subscribe((user) => {
          let userWP = {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            age: user.age,
            sex: user.sex,
            phoneNumber: user.phoneNumber,
            role: user.role,
            description: user.description,
            position: teamuser.position,
          };
          // console.log(userWP);
          playersWithPosition.push(userWP);
        })
      })
    })
    // console.log(playersWithPosition);
    return ObservableOf(playersWithPosition);
  }

}
