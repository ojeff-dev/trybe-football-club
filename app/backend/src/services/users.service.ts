import * as bcrypt from 'bcryptjs';
import JWT from '../utils/JWT';
import IUserModel from '../Interfaces/IUserModel';
import UserModel from '../models/UserModel';
import ILogin from '../Interfaces/ILogin';
import { ServiceMessage, ServiceResponse } from '../types/ServiceResponse';
import { IToken } from '../Interfaces/IToken';

export default class UserService {
  constructor(
    private _userModel: IUserModel = new UserModel(),
  ) {}

  public async verifyLogin(login: ILogin): Promise<ServiceResponse<IToken | ServiceMessage>> {
    const user = await this._userModel.getUserByEmail(login.email);
    if (!user || !bcrypt.compareSync(login.password, user.password)) {
      return {
        status: 'unauthorized',
        data: { message: 'Invalid email or password' },
      };
    }

    const { email, password } = user;
    const token = JWT.sign({ email, password });
    return { status: 'success', data: { token } };
  }
}
