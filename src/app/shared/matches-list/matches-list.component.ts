import { Component, Input, forwardRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { Match } from 'src/app/domain/match.model';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs/operators';
import { User } from 'src/app/domain/user.model';
import { Team } from 'src/app/domain/team.model';
import { TeamService } from 'src/app/services/team.service';
import { MatTableDataSource, MatSort } from '@angular/material';

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
  @Input() level = 'player';
  @Input() token = null;
  @Input() twoTeam = true;
  @Input() title = 'Games';
  //@Input() dataSource: Match[] = [];
  displayedColumns: string[] = ['gameDate', 'gameTeams[0]', 'gameTeams[1]', 'location'];
  // displayedColumns: string[] = ['gameDate', 'location'];
  teams: Team[] = [];
  dataSource: Match[] = [];

  constructor(private userService: UserService,
    private teamService: TeamService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    //console.log('MatchesListComponent works');
    this.userService.getTeamsByUserId(this.initiator, this.token)
      .subscribe(teams => {
        if (teams != null && teams.length > 0) {
          this.teams = [...teams];
          this.teams.forEach((team) => {
            //console.log(team);
            this.teamService.getMatchesByTeamId(team.id, this.token)
              .subscribe(matches => {
                if (matches != null && matches.length > 0) {
                  //console.log(matches);
                  this.dataSource = this.dataSource.concat(matches);
                  //console.log(this.dataSource);
                  //this.changeDetectorRef.detectChanges();
                  //this.dataSource.sort = this.sort;
                }
              })

          });

        }
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
