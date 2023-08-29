import { ServiceResponse } from '../types/ServiceResponse';
import TeamModel from '../models/TeamModel';
import ITeamModel from '../Interfaces/ITeamsModel';
import ITeam from '../Interfaces/ITeam';

export default class TeamsService {
  constructor(private _teamModel: ITeamModel = new TeamModel()) {}

  public async getTeams(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this._teamModel.findAll();
    return {
      status: 'success',
      data: teams,
    };
  }

  public async getTeamByPk(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this._teamModel.findByPk(id);

    if (!team) {
      return {
        status: 'notFound',
        data: { message: 'Team not found' },
      };
    }

    return {
      status: 'success',
      data: team,
    };
  }
}
