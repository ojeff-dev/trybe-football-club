import Team from '../database/models/TeamModel';
import ITeam from '../Interfaces/ITeam';
import ITeamModel from '../Interfaces/ITeamsModel';

export default class TeamModel implements ITeamModel {
  private _model = Team;

  public async findAll(): Promise<ITeam[]> {
    const teams = await this._model.findAll();
    return teams;
  }
}
