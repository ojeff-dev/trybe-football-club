import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';
import TeamsService from '../services/teams.service';

export default class Validations {
  static validateUserFields(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const bearerToken = token.split(' ')[1] || token;
    const validToken = JWT.verify(bearerToken);
    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
    }

    req.body.payload = validToken;
    next();
  }

  static async validateMatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const teamsService = new TeamsService();
    const homeTeam = (await teamsService.getTeamByPk(homeTeamId)).status;
    const awayTeam = (await teamsService.getTeamByPk(awayTeamId)).status;

    if (homeTeam === 'notFound' || awayTeam === 'notFound') {
      return res.status(404)
        .json({ message: 'There is no team with such id!' });
    }

    next();
  }
}
