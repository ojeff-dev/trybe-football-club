import { ServiceResponse } from '../types/ServiceResponse';
import TeamModel from '../models/TeamModel';
import ITeamModel from '../Interfaces/ITeamsModel';
import LeaderboardType from '../types/Leaderboard';
import LeaderboardStructure from '../utils/leaderboardStructure';
import IMatchModel from '../Interfaces/IMatchModel';
import MatchModel from '../models/MatchModel';

export default class LeaderboardService {
  constructor(
    private _teamModel: ITeamModel = new TeamModel(),
    private _matchModel: IMatchModel = new MatchModel(),
  ) {}

  private async createLeaderboardStructure(): Promise<LeaderboardType[]> {
    const leaderboardStructure: LeaderboardType[] = [];
    const teams = await this._teamModel.findAll();

    teams.forEach((team) => leaderboardStructure
      .push(LeaderboardStructure.create(team.teamName)));

    return leaderboardStructure;
  }

  private async writeOnLeaderboard(homeOrAwayTeam: string): Promise<LeaderboardType[]> {
    const leaderboardStructure = await this.createLeaderboardStructure();
    const matches = await this._matchModel.findByProgressStatus(false);

    matches.forEach((match) => {
      leaderboardStructure.forEach((stucture, i) => {
        leaderboardStructure[i] = LeaderboardStructure.write(match, stucture, homeOrAwayTeam);
      });
    });

    return leaderboardStructure;
  }

  public async getLeaderboard(homeOrAwayTeam: string): Promise<ServiceResponse<LeaderboardType[]>> {
    const leaderboard = await this.writeOnLeaderboard(homeOrAwayTeam);

    const sortedLeaderboard = LeaderboardStructure.rankTeams(leaderboard);

    return {
      status: 'success',
      data: sortedLeaderboard,
    };
  }
}
