import mongoose from "mongoose";
import takeoverModule from "./takeover.modle.js";

const db={};

db.mongoose=mongoose;
db.takeover=takeoverModule

export default db;