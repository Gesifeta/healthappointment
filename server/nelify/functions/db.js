import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const mongoURI = `mongodb+srv://${process.env.MONGO_DB_ATLAS_USER}:${process.env.MONGO_DB_ATLAS_PASSWORD}@${process.env.MONGO_DB_ATLAS_IP}/StayHealth?retryWrites=true&w=majority&appName=Cluster0`

export const connectToMongo = async (retryCount) => {
    console.info('Connecting to MongoDB...');
    const MAX_RETRIES = 3;
    const count = retryCount ?? 0;
    try {

        // CREATE MONGOOSE CONNECTION
        mongoose.set('strictQuery', false);
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        mongoose.connection.on('disconnected', () => {
            console.info('MongoDB disconnected');
        });
        mongoose.connection.once('open', () => {
            console.info('MongoDB connected');
        });
        mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false
        });

        return;
    } catch (error) {
        console.error(error);
        const nextRetryCount = count + 1;

        if (nextRetryCount >= MAX_RETRIES) {
            throw new Error('Unable to connect to Mongo!');
        }

        console.info(`Retrying, retry count: ${nextRetryCount}`)

        return await connectToMongo(nextRetryCount);

    }
};
