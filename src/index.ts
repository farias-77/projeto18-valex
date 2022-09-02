import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";

import router from "./routers/routersIndex";
import errorHandlingMiddleware from "./middlewares/errorHandler";

const server = express();

server.use(cors());
server.use(json());
dotenv.config();

server.use(router);
server.use(errorHandlingMiddleware);

const PORT = process.env.PORT || 5009

server.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})