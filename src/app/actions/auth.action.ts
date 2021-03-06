import { Action } from '@ngrx/store';
import { type } from '../utils/type.utils';
import { Auth } from '../domain/auth.model';
import { User } from '../domain/user.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes = {
  /*LOGIN:          type('[Auth] Login'),
  LOGIN_SUCCESS:  type('[Auth] Login Success'),
  LOGIN_FAIL:     type('[Auth] Login Fail'),
  REGISTER:          type('[Auth] Register'),
  REGISTER_SUCCESS:  type('[Auth] Register Success'),
  REGISTER_FAIL:     type('[Auth] Register Fail'),
  LOGOUT:            type('[Auth] Logout'),
  NAVIGATED:         type('[Auth] Navigated'),
  OUTDOOR:           type('[Auth] Out Door'),*/
  LOGIN:          '[Auth] Login',
  LOGIN_SUCCESS:  '[Auth] Login Success',
  LOGIN_FAIL:     '[Auth] Login Fail',
  REGISTER:          '[Auth] Register',
  REGISTER_SUCCESS:  '[Auth] Register Success',
  REGISTER_FAIL:     '[Auth] Register Fail',
  LOGOUT:            '[Auth] Logout',
  OUTDOOR:           '[Auth] Out Door',
  WIRED:             '[Auth] Wired',
  USERCOMFIRMED:     '[Auth] User Comfirmed',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoginAction implements Action {
  readonly type = ActionTypes.LOGIN;

  constructor(public payload: {email: string; password: string}) { }
}

export class LoginSuccessAction implements Action {
  readonly type = ActionTypes.LOGIN_SUCCESS;

  constructor(public payload: Auth) { }
}

export class LoginFailAction implements Action {
  readonly type = ActionTypes.LOGIN_FAIL;

  constructor(public payload: string) { }
}

export class RegisterAction implements Action {
  readonly type = ActionTypes.REGISTER;

  constructor(public payload: User) { }
}

export class RegisterSuccessAction implements Action {
  readonly type = ActionTypes.REGISTER_SUCCESS;

  constructor(public payload: Auth) { }
}

export class RegisterFailAction implements Action {
  readonly type = ActionTypes.REGISTER_FAIL;

  constructor(public payload: string) { }
}

export class LogoutAction implements Action {
  readonly type = ActionTypes.LOGOUT;

  constructor(public payload: Auth) { }
}

// export class UserComfirmedAction implements Action {
//   readonly type = ActionTypes.USERCOMFIRMED;

//   constructor(public payload: Auth) { }
// }

export class OutDoorAction implements Action {
  readonly type = ActionTypes.OUTDOOR;

  constructor(public payload: string) { }
}

export class WiredAction implements Action {
  readonly type = ActionTypes.WIRED;

  constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
            = LoginAction
            | LoginSuccessAction
            | LoginFailAction
            | RegisterAction
            | RegisterSuccessAction
            | RegisterFailAction
            | LogoutAction
            | OutDoorAction
            | WiredAction
            // | UserComfirmedAction
            ;
