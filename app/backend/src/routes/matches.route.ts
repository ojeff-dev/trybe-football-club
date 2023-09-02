import { Router, Response, Request } from 'express';
import MatchesController from '../controllers/matches.controller';
import Validations from '../middlewares/validations';

const MatchController = new MatchesController();
const router = Router();

router.get('/', (req: Request, res: Response) => MatchController.getMatches(req, res));

router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => MatchController.finishTheMatch(req, res),
);

export default router;
