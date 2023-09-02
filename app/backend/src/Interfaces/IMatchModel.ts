import IMatch from './IMatch';

export default interface IMatchModel {
  findAll(): Promise<IMatch[]>,
  findByProgressStatus(inProgressStatus: boolean): Promise<IMatch[]>,
  finishTheMatch(id: number): Promise<number[]>;
  createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatch>,
  updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<number[]>;
}
