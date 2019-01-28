import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of as ObservableOf } from 'rxjs';
import { map, catchError, defaultIfEmpty } from 'rxjs/operators';
//import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as RouterActions from '../actions/router.action';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private store$: Store<fromRoot.State>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store$.select(fromRoot.getAuthState).pipe(
      map(auth => {
        console.log(auth);
        const result = auth.id !== null && auth.id !== undefined;
        if(result) {
          console.log(result);
          this.store$.dispatch(new RouterActions.Go({
            path: ['/login', {routeParam: 1}],
            query: {page: 1},
            extras: {replaceUrl: false }
          }));
        }
        return result;
      }),
      defaultIfEmpty(false),
      catchError(() => ObservableOf(false))
      );
  }
}
