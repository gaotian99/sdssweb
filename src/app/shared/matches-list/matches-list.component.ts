import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Match } from 'src/app/domain/match.model';
import { UserService } from 'src/app/services/user.service';
import { Team } from 'src/app/domain/team.model';
import { TeamService } from 'src/app/services/team.service';
import { MatchService } from 'src/app/services/match.service';
import { CrossModelService } from 'src/app/services/crossmodel.service';

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatchesListComponent),
      multi: true
    },
  ]
})
export class MatchesListComponent implements ControlValueAccessor {
  @Input() initiator = 'guest';
  @Input() level = 0; // 0=guest, 1=player, 2=team, 3=league, 4=globle
  @Input() token = null;
  @Input() twoTeam = true;
  @Input() title = 'Games';
  displayedColumns: string[] = []; // ['gameDate', 'teams[0].name', 'teams[1].name', 'location'];
  teams: Team[] = [];
  teamsId: string[] = [];
  dataSource: Match[] = [];
  // [{
  //   id: null,
  //   location: '',
  //   leagueID: null,
  //   teams: [{
  //     name: '',
  //     id: null,
  //     leagueID: null,
  //   }, {
  //     name: '',
  //     id: null,
  //     leagueID: null,
  //   }],
  // }];

  constructor(private userService: UserService,
    private teamService: TeamService,
    private matchService: MatchService,
    private crossModelService: CrossModelService) { }

  ngOnInit(): void {
    this.crossModelService.getTeamsByLevel(this.initiator, this.token, this.level)
      //this.userService.getTeamsByUserId(this.initiator, this.token)
      .subscribe(teams => {
        if (teams != null && teams.length > 0) {
          this.teams = [...teams];
          this.teams.forEach((team) => {
            this.teamsId.push(team.id);
            this.teamService.getMatchesByTeamId(team.id, this.token)
              .subscribe(matches => {
                if (matches != null && matches.length > 0) {
                  this.dataSource = this.dataSource.concat(matches);
                  this.dataSource.forEach((match) => {
                    match.teams = [{
                      name: '',
                      id: null,
                      leagueID: null,
                    }, {
                      name: '',
                      id: null,
                      leagueID: null,
                    }];
                    this.matchService.getTeamsByMatchId(match.id, this.token)
                      .subscribe(teams => {
                        if (teams != null && teams.length > 0) {
                          if (this.teamsId.indexOf(teams[0].id) >= 0) match.teams = teams;
                          else match.teams = teams.reverse();
                        }
                      })
                  })
                }
              })

          });

        }
        if (this.twoTeam) this.displayedColumns = ['gameDate', 'teams[0].name', 'teams[1].name', 'location'];
        else this.displayedColumns = ['gameDate', 'teams[1].name', 'location'];
        console.log(teams);
      });

  }

  //private propageteChange = (_: any) => { };

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
    //this.propageteChange = fn;
  }
  registerOnTouched(fn: any): void { }

}
