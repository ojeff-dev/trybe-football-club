import { Router, Response, Request } from 'express';
import TeamsController from '../controllers/teams.controller';

const teamController = new TeamsController();
const router = Router();

router.get('/', (req: Request, res: Response) => teamController.getTeams(req, res));

router.get('/:id', (req: Request, res: Response) => teamController.getTeamByPk(req, res));

export default router;
