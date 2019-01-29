import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatTableModule,
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { TeamPlayersListComponent } from './team-players-list/team-players-list.component';
import { MatchesListComponent } from './matches-list/matches-list.component';
// import { MatIconRegistry } from '@angular/material';

@NgModule({
  declarations: [ImageListSelectComponent, TeamPlayersListComponent, MatchesListComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatTableModule,
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    ImageListSelectComponent,
    TeamPlayersListComponent,
    MatchesListComponent,
    MatTableModule,
  ],
  entryComponents: []
})
export class SharedModule { }
