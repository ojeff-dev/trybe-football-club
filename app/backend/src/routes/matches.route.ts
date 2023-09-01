import { Router, Response, Request } from 'express';
import MatchesController from '../controllers/matches.controller';

const MatchController = new MatchesController();
const router = Router();

router.get('/', (req: Request, res: Response) => MatchController.getMatches(req, res));

export default router;
