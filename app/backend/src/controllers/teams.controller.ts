import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamsController {
  constructor(private _teamService: TeamsService = new TeamsService()) {}

  public async getTeams(_req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this._teamService.getTeams();

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
