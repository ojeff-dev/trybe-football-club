import { Request, Response } from 'express';
import UserService from '../services/users.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async login(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.userService.verifyLogin(req.body);

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getUserRole(req: Request, res: Response): Promise<Response> {
    const { email } = req.body.payload;
    const serviceResponse = await this.userService.getUserRole(email);

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
