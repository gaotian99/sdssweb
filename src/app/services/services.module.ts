import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AuthGuardService } from './auth-guard.service';
import { TeamService } from './team.service';
import { TeamUserService } from './teamuser.service';
import { MatchService } from './match.service';
import { CrossModelService } from './crossmodel.service';
import { LeagueService } from './league.service';

@NgModule()
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        AuthService,
        UserService,
        AuthGuardService,
        TeamUserService,
        TeamService,
        MatchService,
        CrossModelService,
        LeagueService,
      ]
    };
  }
}


