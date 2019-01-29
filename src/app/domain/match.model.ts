import { Team } from './team.model';

export interface Match {
  id: string;
  description?: string;
  location?: string;
  leagueID: string;
  gameTeams?: string[];
  teams?: Team[];
}

export enum MatchAccessLevel {
  PLAYER = '[MatchAccessLevel] Player',
  TEAM = 'MatchAccessLevel] Team',
  LEAGUE = 'MatchAccessLevel] League',
  GLOBE = 'MatchAccessLevel] Globe',
};
