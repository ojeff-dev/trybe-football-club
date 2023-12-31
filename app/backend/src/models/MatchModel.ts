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

  public async finishTheMatch(id: number): Promise<number[]> {
    const numberOfRowsUpdated = await this._model.update({
      inProgress: false,
    }, {
      where: { id },
    });
    return numberOfRowsUpdated;
  }

  public async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatch> {
    const data = await this._model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return data;
  }

  public async updateMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<number[]> {
    const numberOfRowsUpdated = await this._model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    return numberOfRowsUpdated;
  }
}
