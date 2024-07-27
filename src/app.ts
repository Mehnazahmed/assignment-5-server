import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import noDataFound from "./app/middlewares/noDataFound";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use("/api", router);
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Welcome to Assignment-3" });
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);
app.use(noDataFound);

export default app;
