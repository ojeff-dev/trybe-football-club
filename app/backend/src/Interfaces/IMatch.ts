export default interface IMatch {
  id: number,
  homeTeamId: number,
  awayTeamGoals: number,
  awayTeamId: number,
  homeTeamGoals: number,
  inProgress: boolean,
  homeTeam?: {
    teamName: string,
  },
  awayTeam?: {
    teamName: string,
  },
}
