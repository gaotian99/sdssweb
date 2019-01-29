import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { getAuthState } from '../../reducers';
import { Observable } from 'rxjs';
import { Auth } from '../../domain/auth.model';
import * as actions from '../../actions/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  auth$: Observable<Auth>;
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() toggleDarkTheme = new EventEmitter<boolean>();

  constructor(private store$: Store<fromRoot.State>) {
    this.auth$ = this.store$.select(getAuthState);
  }

  ngOnInit() {
  }

  openSidebar() {
    this.toggleSidebar.emit();
  }

  onChange(checked: boolean) {
    this.toggleDarkTheme.emit(checked);
  }

  logout() {
    let auth = null;
    this.auth$.subscribe(v => auth = v);
    // console.log(auth);
    this.store$.dispatch(new actions.LogoutAction(auth));
  }
}
