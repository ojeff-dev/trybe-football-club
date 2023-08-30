import IUser from './IUser';

export default interface IUserModel {
  getUserByEmail(email: IUser['email']): Promise<IUser | null>,
}
