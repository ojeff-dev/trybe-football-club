import { Router, Response, Request } from 'express';
import UserController from '../controllers/users.controller';
import Validations from '../middlewares/validations';

const router = Router();

const userController = new UserController();

router.get(
  '/role',
  Validations.validateToken,
  (req: Request, res: Response) => userController.getUserRole(req, res),
);

router.post(
  '/',
  Validations.validateUserFields,
  (req: Request, res: Response) => userController.login(req, res),
);

export default router;
