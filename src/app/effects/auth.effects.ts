import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
//import { go } from '@ngrx/router-store';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import * as actions from '../actions/auth.action';
import { LoginAction, RegisterAction, LoginSuccessAction } from '../actions/auth.action';
import { User } from '../domain/user.model';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions, private router: Router, private service$: AuthService
  ) {}

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType<LoginAction>(actions.ActionTypes.LOGIN),
    map(v => v.payload),
    switchMap(({email, password}) => this.service$.login(email, password)),
    map(auth => new actions.LoginSuccessAction(auth)),
    catchError(err => of(new actions.LoginFailAction(err)))
  );

  @Effect()
  register$: Observable<Action> = this.actions$.pipe(
    ofType<RegisterAction>(actions.ActionTypes.REGISTER),
    map(v => v.payload),
    switchMap((user: User) => this.service$.register(user)),
    map(auth => new actions.RegisterSuccessAction(auth)),
    catchError(err => of(new actions.LoginFailAction(err)))
  );


  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.LOGOUT),
    map(() => {
      this.router.navigate(['/login']);
      return new actions.OutDoorAction('Logout');
    }));

  @Effect()
  loginAndNavigate$: Observable<Action> = this.actions$.pipe(
    ofType<LoginSuccessAction>(actions.ActionTypes.LOGIN_SUCCESS),
    map(() => {
      this.router.navigate(['/test']);
      return new actions.NavigatedAction('Signin');
    }));

  @Effect()
    registerloginAndNavigate$: Observable<Action> = this.actions$.pipe(
      ofType(actions.ActionTypes.REGISTER_SUCCESS),
      map(() => {
        this.router.navigate(['/login']);
        return new actions.OutDoorAction('Signup');
      }));


}
