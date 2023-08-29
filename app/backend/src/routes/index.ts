import { Router } from 'express';
import TeamsRouter from './teams.route';

const router = Router();

router.use('/teams', TeamsRouter);

export default router;
