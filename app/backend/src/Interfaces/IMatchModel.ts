import IMatch from './IMatch';

export default interface IMatchModel {
  findAll(): Promise<IMatch[]>,
  findByProgressStatus(inProgressStatus: boolean): Promise<IMatch[]>,
  finishTheMatch(id: number): Promise<number[]>;
}
