import {Server} from 'http'
import app from './app';
import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config();

let server: Server;
const DB_URL = process.env.DB_URL as string;

const startServer = async() => {
    try {
        await mongoose.connect(DB_URL)

        console.log('Connected to DB');

        server = app.listen(process.env.PORT, () => {
            console.log('Server is running');
        })
    } catch (error) {
        console.log(error);
    }
}

export default (req: any, res: any) => {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    return res.status(200).end();
  }

  return app(req, res);
};

startServer();

