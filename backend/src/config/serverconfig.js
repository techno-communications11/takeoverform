import dotenv from 'dotenv';

dotenv.config();

export const serverConfig = {
    dbUrl: process.env.SERVER_APP_DB_URI
}