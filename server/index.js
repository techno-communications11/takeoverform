import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { serverConfig } from "./src/config/serverconfig.js";
import { DB_RETRY_LIMIT, DB_RETRY_TIMEOUT } from "./src/constant/constant.js";
import routing from "./src/routing/takeover.routing.js";

let connectionRetries = 0;

// Safe function to sanitize route strings
const sanitizeRoute = (route) => {
  if (!route) return "/";
  // Remove protocol and domain if accidentally included
  return route.replace(/^https?:\/\/[^/]+/, "") || "/";
};

// DB connection with retry logic
const connectionDB = async () => {
  try {
    console.log("Establishing DB connection...");
    await mongoose.connect(serverConfig.dbUrl); // no deprecated options
    console.log("DB connected");
  } catch (error) {
    if (connectionRetries < DB_RETRY_LIMIT) {
      connectionRetries++;
      console.log(`Reconnecting to DB ${connectionRetries}/${DB_RETRY_LIMIT}...`);
      await new Promise((resolve) => setTimeout(resolve, DB_RETRY_TIMEOUT));
      await connectionDB();
    } else {
      console.error("DB connection failed after retries:", error);
      process.exit(1);
    }
  }
};

const app = express();

// Middleware
app.use(express.json());

const corsOptions = {
  origin: "https://takeoverform.techno-communications.com",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// Initialize DB
connectionDB();

// Mount takeover routes safely
const takeoverRoute = sanitizeRoute(process.env.SOME_ROUTE || "/takeover");
app.use(takeoverRoute, routing);

// Log environment variables
console.log("DB URL:", process.env.SERVER_APP_DB_URI);
console.log("Route path used for takeover:", takeoverRoute);

// Safe logging of all registered routes
if (app._router) {
  console.log("Registered routes:");
  app._router.stack
    .filter((layer) => layer.route)
    .forEach((layer) => {
      console.log(
        `${Object.keys(layer.route.methods).join(", ").toUpperCase()} ${layer.route.path}`
      );
    });
}

// Start server
const PORT = 4570;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
