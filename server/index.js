import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routing from "./src/routing/index.js";
import { serverConfig } from "./src/config/serverconfig.js";
import { DB_RETRY_LIMIT, DB_RETRY_TIMEOUT } from "./src/constant/constant.js";

let connectionRetries = 0;

// DB connection
const connectionDB = async () => {
    try {
        if (!serverConfig.dbUrl) {
            throw new Error("SERVER_APP_DB_URI is not defined in the .env file");
        }
        if (!serverConfig.dbUrl.startsWith("mongodb://") && !serverConfig.dbUrl.startsWith("mongodb+srv://")) {
            throw new Error(`Invalid MongoDB URI: ${serverConfig.dbUrl}`);
        }
        console.log("Establishing DB connection...", serverConfig.dbUrl);
        await mongoose.connect(serverConfig.dbUrl);
        console.log("DB connected successfully");
    } catch (error) {
        if (connectionRetries < DB_RETRY_LIMIT) {
            connectionRetries++;
            console.log(`Reconnecting to DB ${connectionRetries}/${DB_RETRY_LIMIT}`);
            await new Promise(resolve => setTimeout(resolve, DB_RETRY_TIMEOUT));
            await connectionDB();
        } else {
            console.error("Failed to connect to DB:", error);
            process.exit(1);
        }
    }
};

const app = express();

// Connect to DB
connectionDB();

// Middleware
app.use(express.json());

// CORS setup
const allowedOrigins = [
    "http://localhost:4570",
    "https://takeoverform.techno-communications.com"
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true); // allow Postman or curl
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `CORS policy does not allow access from ${origin}`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

// Routes
app.use("/api", routing);

// Start server
const port = process.env.PORT || 4570;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

export default app;