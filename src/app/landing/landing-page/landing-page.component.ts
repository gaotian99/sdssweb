import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { getAuthState } from '../../reducers';
import { Observable } from 'rxjs';
import { Auth } from '../../domain/auth.model';
import * as authActions from '../../actions/auth.action';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs/operators';
import { User } from 'src/app/domain/user.model';
import { Team } from 'src/app/domain/team.model';
import { Match } from 'src/app/domain/match.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private fb: FormBuilder, private store$: Store<fromRoot.State>,
    private userService: UserService, private teamService: TeamService) {
    this.store$.select(getAuthState).subscribe(auth => this.auth = auth);
    if (this.auth === null) this.store$.dispatch(new authActions.WiredAction('Access deny'));
  }

  landingForm: FormGroup;
  auth: Auth;
  user: User = { name: '', email: '' };
  teams: Team[] = [];
  games: Match[] = [];

  ngOnInit() {
    this.landingForm = this.fb.group({
      matchesList: [],
    });
    this.userService.getOneUserById(this.auth.userId, this.auth.id)
      .subscribe(user => {
        if (user !== null && user.name !== null) {
          //this.username = user.name;
          this.user = user;
          // Object.assign(this.auth, {user: user});
        }
      });

    this.userService.getTeamsByUserId(this.auth.userId, this.auth.id)
      .subscribe(teams => {
        if (teams != null && teams.length > 0) {
          this.teams = [...teams];
          this.teamService.getMatchesByTeamId(teams[0].id, this.auth.id)
            .subscribe(matches => {
              if (matches != null && matches.length > 0) {
                this.games = [...matches];
              }
            })
        }
      });

    // this.teamService.getMatchesByTeamId(this.teams[0].id, this.auth.id)
    //   .subscribe(matches => {
    //     if (matches != null && matches.length > 0) {
    //       this.games = [...matches];
    //     }
    //   })

  }

}
