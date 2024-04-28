import express from "express";
import mongoose from "mongoose";
import { routes } from "./../routes";
import config from "./config";
import { createUsers } from "../config/users";
import { createCategories } from "../config/categories";
import { createTasks } from "../config/tasks";
import UserModel from "../src/schema/user.schema";
import CategoryModel from "../src/schema/category.schema";
import TaskModel from "../src/schema/task.schema";

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

  public async insertUserBase(collectionName: string) {
    const users = createUsers();
    await mongoose.connection.collection(collectionName).insertMany(users);
  }

  public async insertCategoryBase(collectionName: string) {
    const categories = await createCategories();
    await mongoose.connection.collection(collectionName).insertMany(categories);
  }

  public async insertTaskBase(collectionName: string) {
    const tasks = await createTasks();
    await mongoose.connection.collection(collectionName).insertMany(tasks);
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
