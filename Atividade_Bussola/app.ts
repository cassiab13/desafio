import express from "express";
import mongoose from "mongoose";
import { routes } from "./routes";

export class App {
  express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.database();
    this.routes();
  }

  private middleware(): void {
    this.express.use(express.json());
  }

  private async database() {
    try {
      mongoose.set("strictQuery", true);
      await mongoose.connect("mongodb://0.0.0.0:27017/esoft-a-5s");
      // await mongoose.connect("mongodb://db:27017");
      console.log("Connect database success");
    } catch (error) {
      console.error("Cannot connect to database, error:", error);
    }
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;

