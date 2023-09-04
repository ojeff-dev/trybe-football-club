import { Router } from 'express';
import TeamsRouter from './teams.route';
import UsersRouter from './users.route';
import MatchesRouter from './matches.route';
import LeaderboardRouter from './leaderboard.route';

const router = Router();

router.use('/teams', TeamsRouter);
router.use('/login', UsersRouter);
router.use('/matches', MatchesRouter);
router.use('/leaderboard', LeaderboardRouter);

export default router;
