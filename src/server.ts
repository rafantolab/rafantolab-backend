import {Server} from 'http'
import app from './app';
import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config();

let server: Server;
const DB_URL : string = process.env.DB_URL;

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

startServer();

