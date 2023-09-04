import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(private _matchService: LeaderboardService = new LeaderboardService()) {}

  public async getLeaderboardByHome(_req: Request, res: Response): Promise<Response> {
    const homeOrAwayTeam = 'homeTeam';
    const serviceResponse = await this._matchService.getLeaderboard(homeOrAwayTeam);

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getLeaderboardByAway(_req: Request, res: Response): Promise<Response> {
    const homeOrAwayTeam = 'awayTeam';
    const serviceResponse = await this._matchService.getLeaderboard(homeOrAwayTeam);

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
