import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// app.use("/api");

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
