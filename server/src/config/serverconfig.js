import dotenv from 'dotenv';
dotenv.config();

export const serverConfig = {
    dbUrl: process.env.SERVER_APP_DB_URI
};

console.log('DB URL:', serverConfig.dbUrl); // Debug line to check the value

const DB_RETRY_LIMIT = 5;
const DB_RETRY_TIMEOUT = 5000; // in milliseconds

export {
    DB_RETRY_LIMIT,
    DB_RETRY_TIMEOUT
};