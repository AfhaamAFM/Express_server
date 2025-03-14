import dotenv from 'dotenv';

dotenv.config();
export const ENV = {
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
  MONGODB_USER: process.env.MONGODB_USER,
};
