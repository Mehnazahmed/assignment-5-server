import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import notDataFound from "./app/middlewares/noDataFound";
import noDataFound from "./app/middlewares/noDataFound";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use("/api", router);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);
app.use(noDataFound);

export default app;
