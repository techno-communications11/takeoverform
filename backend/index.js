import express from "express";
import cors from 'cors';
import { serverConfig } from "./src/config/serverconfig.js";
import { DB_RETRY_LIMIT, DB_RETRY_TIMEOUT } from "./src/constant/constant.js";
import mongoose from "mongoose";
import routing from "./src/routing/index.js";

let connnectionRetries = 0;
const connectionDB = async () => {
    try {
        console.log("Establishing DB connection....");
        await mongoose.connect(serverConfig.dbUrl);
        console.log('Db connected');
    } catch (error) {
        if (connnectionRetries < DB_RETRY_LIMIT) {
            connnectionRetries++;
            console.log(`Reconnecting to DB ${connnectionRetries}/${DB_RETRY_LIMIT}`);
            await new Promise(resolve => setTimeout(resolve, DB_RETRY_TIMEOUT));
            await connectionDB();
        } else {
            process.exit();
        }
    }
}

const app=express();

connectionDB()
    .then(res => console.log("db Connected"))
    .catch(err => console.log("DB NOT Connected",err));

app.use(express.json());
app.use(cors());
app.use('/',routing)




app.listen(3500,()=>{
    console.log(`server are running on port http://localhost:${3500}`);
})

export default app;