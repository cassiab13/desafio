import { MongoClient } from "mongodb";
import express, { Application } from "express";
import mongoose from "mongoose";
import { routes } from "./../routes";
import config from "./config";
import { users } from "./users";

export class RunSeed {
  express: express.Application;
  private DB_URL = config.dbURL;
  private DB_NAME = config.dbName;
  private server: any;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(express.json());
  }

  public serverStarter() {
    const port = 9999;
    const ipAddress = "localhost";
    this.server = this.express.listen(port, ipAddress, () => {
      console.log(`Server running at port ${port}`);
    });
  }

  public async database(): Promise<void> {
    try {
      if (!mongoose.connection.readyState) {
        await mongoose.connect(`${this.DB_URL}/${this.DB_NAME}`);
        console.log(this.DB_NAME + " connected");
      }
    } catch (error) {
      console.error("Cannot connect to database, error:", error);
    }
  }

  // public async database(): Promise<void> {
  //   try {
  //     const client = new MongoClient(`${this.DB_URL}/${this.DB_NAME}`);
  //     await client.connect();

  //     console.log(`Connect to: ${config.dbName}`);
  //     const dbName = config.dbName;
  //   } catch (error) {
  //     console.error("Cannot connect to database, error:", error);
  //   }
  // }
  public async insertUserBase(collectionName: string) {
    await mongoose.connection.collection(collectionName).insertMany(users);
  }

  public async deleteAllDocuments(collectionName: string): Promise<void> {
    try {
      await mongoose.connection.collection(collectionName).deleteMany({});
    } catch (error) {
      console.error("Não foi possível deletar");
    }
  }

  public async dropDatabase(): Promise<void> {
    try {
      await mongoose.connection.dropDatabase();
      console.log("Database deletada");
    } catch (error) {
      console.error("Error closing database connection:", error);
    }
  }

  public async closeDatabaseConnection(): Promise<void> {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.error("Error closing database connection:", error);
    }
  }

  public closeConnection(): void {
    if (this.server) this.server.close();
  }

  private routes(): void {
    this.express.use(routes);
  }
}
