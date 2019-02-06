import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { CrossModelService } from 'src/app/services/crossmodel.service';
import { User } from 'src/app/domain';
import { TeamUserService } from 'src/app/services/teamuser.service';


@Component({
  selector: 'app-team-players-list',
  templateUrl: './team-players-list.component.html',
  styleUrls: ['./team-players-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeamPlayersListComponent),
      multi: true
    },
  ]
})

export class TeamPlayersListComponent implements ControlValueAccessor {
  @Input() initiator = 'guest';
  @Input() level = 0; //0=guest, 1=player, 2=team, 3=league, 4=globle
  @Input() token = null;
  @Input() title = 'Team Players';
  @Input() position = false;
  displayedColumns: string[] = [];
  dataSource: User[] = [];

  constructor(private userService: UserService,
    private teamUserService: TeamUserService,
    private crossModelService: CrossModelService) { }

  ngOnInit(): void {
    this.crossModelService.getUsersByLevel(this.initiator, this.token, this.level)
      //this.crossModelService.getUsersAndPositionByTeamId("5c3ff1e96f20550d13a11df8", this.token)
      .subscribe(users => {
        //console.log(users);
        if (this.position) {
          users.forEach(user => {
            this.crossModelService.getTeamUsersByLevel(user.id, this.initiator, this.token, this.level).subscribe(teamusers => {
              user.position = teamusers[0].position;
            })
          })
        }
        if (users != null && users.length > 0) {
          console.log(users);
          this.dataSource = users;
          console.log(this.dataSource);
        }
        if (this.position) this.displayedColumns = ['name', 'age', 'position', 'sex', 'phoneNumber']; //,'sex', 'phonenumber'];
        else this.displayedColumns = ['name', 'age', 'sex', 'phoneNumber'];
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
