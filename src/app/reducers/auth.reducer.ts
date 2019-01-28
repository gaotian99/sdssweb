//import { Action } from '@ngrx/store';
import * as actions from '../actions/auth.action';
import { Auth } from '../domain/auth.model';
import { User } from '../domain';

export const initialState: Auth = null;

export function authReducer(state = initialState, action: actions.Actions ): Auth {
  switch (action.type) {
    case actions.ActionTypes.REGISTER_SUCCESS: {
      let user = Object.assign({}, <User>action.payload);
      let auth = {
        user: user,
        email: user.email,
        userId: user.id,
        id: '',
      };
      return auth;
    }

    case actions.ActionTypes.USERCOMFIRMED:
    case actions.ActionTypes.LOGIN_SUCCESS: {
      return {
        ...<Auth>action.payload
      };
    }

    case actions.ActionTypes.REGISTER_FAIL:
    case actions.ActionTypes.LOGIN_FAIL: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
