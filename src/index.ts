import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";

import errorHandler from "./middlewares/errorHandler";
import router from "./routers/routersIndex";

const server = express();

server.use(cors());
server.use(json());
dotenv.config();

server.use(errorHandler);
server.use(router);


const PORT = process.env.PORT || 5009

server.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})