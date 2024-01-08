import crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

export interface JWTUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export const sign = (user: JWTUser, passwordHash: string): string => {
  const hash = crypto.createHash('sha256');
  hash.update(passwordHash);

  const a = hash.digest('base64');

  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: user
    },
    a
  );
};

export const verify = (token: string, passwordHash: string): boolean => {
  const hash = crypto.createHash('sha256');
  hash.update(passwordHash);

  try {
    jwt.verify(token, hash.digest('base64'));
    return true;
  } catch (err) {
    return false;
  }
};

export const decode = (token: string): JWTUser => {
  const jwtObject: any = jwt.decode(token);
  const user: JWTUser = jwtObject.data;
  return user;
};

export default {
  decode,
  sign,
  verify
};
