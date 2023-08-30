import { JwtPayload, Secret, sign, SignOptions, verify } from 'jsonwebtoken';

export default class JWT {
  private static _secret: Secret = process.env.JWT_SECRET || 'jwt_secret';

  private static jwtConfig: SignOptions = {
    algorithm: 'HS256', expiresIn: '1d',
  };

  static sign(payload: JwtPayload): string {
    return sign(payload, JWT._secret, JWT.jwtConfig);
  }

  static verify(token: string): JwtPayload | string {
    try {
      return verify(token, JWT._secret) as JwtPayload;
    } catch (e) {
      return 'Token must be a valid token';
    }
  }
}
