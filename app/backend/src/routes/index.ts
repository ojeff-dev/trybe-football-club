import { Router } from 'express';
import TeamsRouter from './teams.route';
import UsersRouter from './users.route';

const router = Router();

router.use('/teams', TeamsRouter);
router.use('/login', UsersRouter);

export default router;
