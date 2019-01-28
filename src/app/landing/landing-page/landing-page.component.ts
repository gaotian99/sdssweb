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

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private fb: FormBuilder, private store$: Store<fromRoot.State>, private userService: UserService) {
    this.store$.select(getAuthState).subscribe(auth => this.auth = auth);
    if (this.auth === null) this.store$.dispatch(new authActions.WiredAction('Access deny'));
  }

  auth: Auth;
  user: User = {name: '', email: ''};
  teams: Team[] = [];

  ngOnInit() {
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
        if ( teams != null && teams.length > 0) {
          this.teams = teams;
        }
      })
  }

}
