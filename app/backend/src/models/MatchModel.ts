import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import IMatch from '../Interfaces/IMatch';
import IMatchModel from '../Interfaces/IMatchModel';

export default class MatchModel implements IMatchModel {
  private _model = Match;

  public async findAll(): Promise<IMatch[]> {
    const matches = await this._model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }

  public async findByProgressStatus(inProgressStatus: boolean): Promise<IMatch[]> {
    const matches = await this._model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress: inProgressStatus },
    });

    return matches;
  }
}
