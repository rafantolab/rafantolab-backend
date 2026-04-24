import app from './app';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const DB_URL = process.env.DB_URL as string;

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;
    await mongoose.connect(DB_URL);
    isConnected = true;
    console.log('Connected to DB');
};

connectDB().catch(console.error);

export default app;