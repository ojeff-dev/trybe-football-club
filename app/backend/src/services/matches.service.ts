import { ServiceResponse } from '../types/ServiceResponse';
import MatchModel from '../models/MatchModel';
import IMatchModel from '../Interfaces/IMatchModel';
import IMatch from '../Interfaces/IMatch';

export default class MatchesService {
  constructor(private _matchModel: IMatchModel = new MatchModel()) {}

  public async getMatches(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this._matchModel.findAll();
    return {
      status: 'success',
      data: matches,
    };
  }
}
