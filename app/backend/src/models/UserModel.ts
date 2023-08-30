import User from '../database/models/UserModel';
import IUser from '../Interfaces/IUser';
import IUserModel from '../Interfaces/IUserModel';

export default class UserModel implements IUserModel {
  private _user = User;

  public async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await this._user.findOne({ where: { email } });

    return user;
  }
}
