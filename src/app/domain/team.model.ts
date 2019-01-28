export interface Team {
  id: string;
  description?: string;
  avatar?: string;
  captain?: string;
  name: string;
  leagueID: string;
  players?: string[];
  winInSeason?: number;
}
