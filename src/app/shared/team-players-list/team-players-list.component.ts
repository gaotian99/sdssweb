import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CrossModelService } from 'src/app/services/crossmodel.service';
import { User } from 'src/app/domain';

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
  displayedColumns: string[] = []; //['gameDate', 'teams[0].name', 'teams[1].name', 'location'];
  dataSource: User[] = [];

  constructor(
    private crossModelService: CrossModelService) { }

  ngOnInit(): void {
    this.crossModelService.getUsersAndPositionByLevel(this.initiator, this.token, this.level)
      .subscribe(users => {
        if (users != null && users.length > 0) {
          this.dataSource = [...users];
        }
        if (this.position) this.displayedColumns = ['name', 'position', 'age', 'sex', 'phonenumber'];
        else this.displayedColumns = ['name', 'age', 'sex', 'phonenumber'];
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
