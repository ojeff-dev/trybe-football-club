import { Router } from 'express';
import TeamsRouter from './teams.route';
import UsersRouter from './users.route';
import MatchesRouter from './matches.route';

const router = Router();

router.use('/teams', TeamsRouter);
router.use('/login', UsersRouter);
router.use('/matches', MatchesRouter);

export default router;
