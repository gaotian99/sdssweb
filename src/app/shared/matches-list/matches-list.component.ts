import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { Match } from 'src/app/domain/match.model';

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
  @Input() title = 'Games';
  @Input() dataSource: Match[] = [];
  displayedColumns: string[] = ['gameDate', 'gameTeams[0]', 'gameTeams[1]', 'location'];
  // displayedColumns: string[] = ['gameDate', 'location'];

  constructor() { }

  private propageteChange = (_: any) => { };

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
    this.propageteChange = fn;
  }
  registerOnTouched(fn: any): void { }

}
