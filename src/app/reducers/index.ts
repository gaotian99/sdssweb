import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { RouterModule } from '@angular/router';
import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store';
//import { StoreRouterConnectingModule } from '@ngrx/router-store';
//import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { AppStoreComponent }  from './app.component';
//import { storeFreeze } from 'ngrx-store-freeze';
//import { compose } from '@ngrx/core/compose';
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
  auth: fromAuth.authReducer,
};

const productionReducers: ActionReducer<State> = combineReducers(reducers);
//const developmentReducers: ActionReducer<any> = compose(storeFreeze, combineReducers)(reducers); //compose(storeFreeze, combineReducers)(reducers);
const developmentReducers: ActionReducer<State> = combineReducers(reducers);

export function appReducer(state = initialState, action: {type: string; payload: any} ): State {
    return environment.production
      ? productionReducers(state, action)
      : developmentReducers(state, action);
  // return productionReducers(state, action);
}

export const getAuthState = (state: any) => {
  //console.log(state.dataOfApp.auth);
  return state.dataOfApp.auth;
}

@NgModule({
  // declarations: [ AppStoreComponent ],
  imports: [
    // BrowserModule,
    // RouterModule.forRoot(routes, { useHash: true }),
    //StoreModule.forRoot(fromAuth.authReducer),
    //StoreModule.provideStore(reducer),
//    StoreRouterConnectingModule,
    //!environment.production
    //  ? StoreDevtoolsModule.instrument()
    //  : [],
//    StoreDevtoolsModule.instrument(),
  ],
  // providers: [],
  // bootstrap: [ AppStoreComponent ]
})
export class AppStoreModule {}
