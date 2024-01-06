import * as jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const sign = (user: object, passwordHash: string): string => {
  const hash = crypto.createHash('sha256');
  hash.update(passwordHash);

  const a = hash.digest('base64');

  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 1 * 60,
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

export default {
  sign,
  verify
};
