import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Match } from 'src/app/domain/match.model';
import { UserService } from 'src/app/services/user.service';
import { Team } from 'src/app/domain/team.model';
import { TeamService } from 'src/app/services/team.service';
import { MatchService } from 'src/app/services/match.service';
import { CrossModelService } from 'src/app/services/crossmodel.service';
import { User } from 'src/app/domain';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeamsListComponent),
      multi: true
    },
  ]
})

export class TeamsListComponent implements ControlValueAccessor {
  @Input() initiator = 'guest';
  @Input() level = 0; //0=guest, 1=player, 2=team, 3=league, 4=globle
  @Input() token = null;
  @Input() title = 'Team Players';

  constructor(private userService: UserService,
    private teamService: TeamService,
    private matchService: MatchService,
    private crossModelService: CrossModelService) { }

  ngOnInit() {
  }

    //private propageteChange = (_: any) => { };

    writeValue(obj: any): void {
    }
    registerOnChange(fn: any): void {
      //this.propageteChange = fn;
    }
    registerOnTouched(fn: any): void { }
  
}
