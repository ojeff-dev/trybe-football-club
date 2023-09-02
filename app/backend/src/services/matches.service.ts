import { ServiceResponse } from '../types/ServiceResponse';
import MatchModel from '../models/MatchModel';
import IMatchModel from '../Interfaces/IMatchModel';
import IMatch from '../Interfaces/IMatch';

export default class MatchesService {
  constructor(private _matchModel: IMatchModel = new MatchModel()) {}

  public async getMatches(inProgress: string): Promise<ServiceResponse<IMatch[]>> {
    if (inProgress) {
      const inProgressStatus = inProgress === 'true';
      const matchesInProgress = await this._matchModel.findByProgressStatus(inProgressStatus);

      return {
        status: 'success',
        data: matchesInProgress,
      };
    }

    const matches = await this._matchModel.findAll();
    return {
      status: 'success',
      data: matches,
    };
  }

  public async finishTheMatch(id: number): Promise<ServiceResponse<void>> {
    await this._matchModel.finishTheMatch(id);

    return {
      status: 'success',
      data: { message: 'Finished' },
    };
  }

  public async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<IMatch>> {
    const data = await this._matchModel.createMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    return {
      status: 'success',
      data,
    };
  }
}
