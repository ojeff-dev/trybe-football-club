import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(private _matchService: MatchesService = new MatchesService()) {}

  public async getMatches(_req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this._matchService.getMatches();

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
