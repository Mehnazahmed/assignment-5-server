import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Request, Response } from "express";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.get("/", (req: Request, res: Response) => {
      res.send({ message: "Welcome to Assignment-3" });
    });

    app.listen(config.port, () => {
      console.log(` app is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
