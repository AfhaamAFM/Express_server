import { ENV } from '@Typings/constants/env';
import mongoose from 'mongoose';

const { MONGODB_PASSWORD, MONGODB_USER } = ENV;
const MONGO_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@babylonia.yzygx.mongodb.net/?retryWrites=true&w=majority&appName=babylonia`;
console.log({ MONGODB_PASSWORD, MONGODB_USER });

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {} as mongoose.ConnectOptions);

    console.log('✅ MongoDB Connected Successfully!');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

export { connectDB };
