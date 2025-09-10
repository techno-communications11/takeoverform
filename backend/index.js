import express from "express";
import cors from "cors";
import { serverConfig } from "./src/config/serverconfig.js";
import { DB_RETRY_LIMIT, DB_RETRY_TIMEOUT } from "./src/constant/constant.js";
import mongoose from "mongoose";
import routing from "./src/routing/takeover.routing.js";

let connectionRetries = 0; // Fixed typo: connnectionRetries -> connectionRetries

const connectionDB = async () => {
  try {
    console.log("Establishing DB connection....");
    await mongoose.connect(serverConfig.dbUrl);
    console.log("Db connected");
  } catch (error) {
    if (connectionRetries < DB_RETRY_LIMIT) { // Fixed typo here too
      connectionRetries++;
      console.log(`Reconnecting to DB ${connectionRetries}/${DB_RETRY_LIMIT}`);
      await new Promise((resolve) => setTimeout(resolve, DB_RETRY_TIMEOUT));
      await connectionDB();
    } else {
      console.error("DB connection failed after retries:", error);
      process.exit(1); // Exit with failure code
    }
  }
};

const app = express();

// Initialize DB connection (no need for .then/.catch since errors are handled in connectionDB)
connectionDB();

app.use(express.json());

/**
 * CORS configuration for all routes
 */
const corsOptions = {
  origin: "https://takeoverform.techno-communications.com", // Restrict to frontend
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions)); // Handles CORS, including preflight (OPTIONS) requests

// Mount takeover routes
app.use("/takeover", routing);

// Start server
const PORT = 4500;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;