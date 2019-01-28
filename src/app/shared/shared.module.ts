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
} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { TeamPlayersListComponent } from './team-players-list/team-players-list.component';
// import { MatIconRegistry } from '@angular/material';

@NgModule({
  declarations: [ImageListSelectComponent, TeamPlayersListComponent],
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
//    MatIconRegistry,
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
//    MatIconRegistry,
    ImageListSelectComponent,
  ],
  entryComponents: []
})
export class SharedModule { }
