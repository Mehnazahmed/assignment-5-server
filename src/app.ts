import path from "path";

import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import noDataFound from "./app/middlewares/noDataFound";
import cookieParser from "cookie-parser";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
       "http://localhost:5173",
      "https://assignment-5-client-three.vercel.app",
    ],
    credentials: true,

    // methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", router);
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Welcome to Assignment-5" });
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);
app.use(noDataFound);

export default app;
