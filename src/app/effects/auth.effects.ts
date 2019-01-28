import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import * as actions from '../actions/auth.action';
import { LoginAction, RegisterAction, LoginSuccessAction } from '../actions/auth.action';
import { User } from '../domain/user.model';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions, private router: Router, private service$: AuthService, private userService$: UserService
  ) { }

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType<LoginAction>(actions.ActionTypes.LOGIN),
    map(v => v.payload),
    switchMap(({ email, password }) => this.service$.login(email, password)),
    map(auth => {
      this.router.navigate(['/landing']);
      return new actions.LoginSuccessAction(auth);
    }),
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
    ofType<actions.LogoutAction>(actions.ActionTypes.LOGOUT),
    map(v => v.payload),
    switchMap((v) => this.service$.logout(v.id)),
    map(() => {
      this.router.navigate(['/login']);
      return new actions.OutDoorAction('Already Logout');
    }),
    catchError(err => of(new actions.WiredAction(err)))
  );

  @Effect()
  wired$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.WIRED),
    map(() => {
      this.router.navigate(['/login']);
      return new actions.OutDoorAction('Unknown Auth Status');
    }));

  // @Effect()
  // loginAndNavigate$: Observable<Action> = this.actions$.pipe(
  //   ofType<LoginSuccessAction>(actions.ActionTypes.LOGIN_SUCCESS),
  //   map(v => v.payload),
  //   switchMap((auth) => this.userService$.getOneUserInfo(auth)),
  //   map(auth => {
  //     console.log();
  //     return new actions.UserComfirmedAction(auth);
  //   }),
  //   catchError(err => of(new actions.LoginFailAction(err)))
  // );

/*
  @Effect()
  registerloginAndNavigate$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.REGISTER_SUCCESS),
    map(() => {
      this.router.navigate(['/login']);
      return new actions.OutDoorAction('Signup');
    }));
*/

}
