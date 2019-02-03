import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Team } from 'src/app/domain/team.model';
import { CrossModelService } from 'src/app/services/crossmodel.service';

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
  @Input() title = 'Teams in this league';
  @Input() winInSeason = false;
  displayedColumns: string[] = []; //['gameDate', 'teams[0].name', 'teams[1].name', 'location'];
  dataSource: Team[] = [];

  constructor(private userService: UserService,
    private crossModelService: CrossModelService) { }

  ngOnInit() {
    this.crossModelService.getTeamsByLevel(this.initiator, this.token, this.level)
      .subscribe(teams => {
        if (teams != null && teams.length > 0) {
          this.dataSource = [...teams];
        }
        if (this.winInSeason) this.displayedColumns = ['name', 'description', 'winInSeason'];
        else this.displayedColumns = ['name', 'description'];
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
