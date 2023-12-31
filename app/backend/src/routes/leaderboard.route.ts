import { Router, Response, Request } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardController = new LeaderboardController();
const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => leaderboardController.getFullLeaderboard(req, res),
);

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getLeaderboardByHome(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getLeaderboardByAway(req, res),
);

export default router;
