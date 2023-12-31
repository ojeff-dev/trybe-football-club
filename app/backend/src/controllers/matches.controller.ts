import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(private _matchService: MatchesService = new MatchesService()) {}

  public async getMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    const serviceResponse = await this._matchService.getMatches(inProgress as string);

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async finishTheMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const serviceResponse = await this._matchService.finishTheMatch(Number(id));

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async createMatch(req: Request, res: Response): Promise<Response> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const serviceResponse = await this._matchService.createMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;

    const serviceResponse = await this._matchService.updateMatch(
      Number(id),
      homeTeamGoals,
      awayTeamGoals,
    );

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
