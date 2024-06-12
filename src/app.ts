import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

export default app;
