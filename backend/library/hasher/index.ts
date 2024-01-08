import argon2 from 'argon2';

export const hash = async (val: string): Promise<string> => {
  return await argon2.hash(val);
};

export const verify = async (hashedPassword: string, password: string): Promise<boolean> => {
  return await argon2.verify(hashedPassword, password);
};

export default {
  hash,
  verify
};
