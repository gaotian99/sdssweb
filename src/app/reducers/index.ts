import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { RouterModule } from '@angular/router';
import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { AppStoreComponent }  from './app.component';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
// import { routes } from './routes';
import { environment } from 'src/environments/environment.prod';
import { Auth } from '../domain/auth.model';

import * as fromAuth from './auth.reducer';

export interface State {
  auth: Auth;
};

const initialState: State = {
  auth: fromAuth.initialState,
};

const reducers = {
  auth: fromAuth.reducer,
};

const productionReducers: ActionReducer<State> = combineReducers(reducers);
const developmentReducers: ActionReducer<State> = combineReducers(reducers); //compose(storeFreeze, combineReducers)(reducers);

export function reducer(state = initialState, action: {type: string; payload: any} ): State {
  return environment.production
    ? productionReducers(state, action)
    : developmentReducers(state, action);
}

export const getAuthState = (state: State) => state.auth;

@NgModule({
  // declarations: [ AppStoreComponent ],
  imports: [
    // BrowserModule,
    // RouterModule.forRoot(routes, { useHash: true }),
    StoreModule.forRoot(reducer),
    StoreRouterConnectingModule,
    !environment.production
      ? StoreDevtoolsModule.instrument()
      : [],
  ],
  // providers: [],
  // bootstrap: [ AppStoreComponent ]
})
export class AppStoreModule {}
