import IMatch from '../Interfaces/IMatch';
import LeaderboardType from '../types/Leaderboard';

const create = (teamName: string): LeaderboardType => ({
  name: teamName,
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '0.0',
});

const teamWin = (homeTeamGoals: number, awayTeamGoals: number): string => {
  if (homeTeamGoals > awayTeamGoals) return 'homeTeam';
  if (awayTeamGoals > homeTeamGoals) return 'awayTeam';

  return 'draw';
};

const handleGoals = (newStructure: LeaderboardType, match: IMatch, homeOrAwayTeam: string) => {
  const updatedStructure = { ...newStructure };
  updatedStructure.goalsFavor = newStructure.goalsFavor;
  updatedStructure.goalsOwn = newStructure.goalsOwn;

  if (homeOrAwayTeam === 'homeTeam') {
    updatedStructure.goalsFavor += match.homeTeamGoals;
    updatedStructure.goalsOwn += match.awayTeamGoals;
  } else if (homeOrAwayTeam === 'awayTeam') {
    updatedStructure.goalsFavor += match.awayTeamGoals;
    updatedStructure.goalsOwn += match.homeTeamGoals;
  }

  updatedStructure.goalsBalance = (updatedStructure.goalsFavor - updatedStructure.goalsOwn);
  updatedStructure.efficiency = `${((newStructure
    .totalPoints / (newStructure.totalGames * 3)) * 100).toFixed(2)}`;

  return updatedStructure;
};

const write = (match: IMatch, structure: LeaderboardType, homeOrAwayTeam: string) => {
  let newStructure = { ...structure };
  const homeOrAway = homeOrAwayTeam === 'homeTeam'
    ? match.homeTeam?.teamName : match.awayTeam?.teamName;

  if (structure.name === homeOrAway) {
    const matchResult = teamWin(match.homeTeamGoals, match.awayTeamGoals);

    if (matchResult === homeOrAwayTeam) {
      newStructure.totalPoints += 3;
      newStructure.totalVictories += 1;
    } else if (matchResult === 'draw') {
      newStructure.totalPoints += 1;
      newStructure.totalDraws += 1;
    } else newStructure.totalLosses += 1;

    newStructure.totalGames += 1;

    newStructure = handleGoals(newStructure, match, homeOrAwayTeam);
  }

  return newStructure;
};

const handleRating = (homeTeam: LeaderboardType, awayTeam: LeaderboardType): number => {
  if (homeTeam.totalPoints > awayTeam.totalPoints) return -1;
  if (homeTeam.totalPoints < awayTeam.totalPoints) return 1;

  if (homeTeam.totalVictories > awayTeam.totalVictories) return -1;
  if (homeTeam.totalVictories < awayTeam.totalVictories) return 1;

  if (homeTeam.goalsBalance > awayTeam.goalsBalance) return -1;
  if (homeTeam.goalsBalance < awayTeam.goalsBalance) return 1;

  if (homeTeam.goalsFavor > awayTeam.goalsFavor) return -1;
  if (homeTeam.goalsFavor < awayTeam.goalsFavor) return 1;

  return 0;
};

const rankTeams = (teams: LeaderboardType[]): LeaderboardType[] => {
  teams.sort(handleRating);

  return teams;
};

export default {
  create,
  teamWin,
  write,
  rankTeams,
};
