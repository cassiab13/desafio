import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import UserModel from "../src/schema/user.schema";
import TaskModel from "../src/schema/task.schema";
import { TaskStatus } from "../src/enums/task.status";
import { RunSeed } from "./../config/seed";
import request from "supertest";
import CategoryModel from "../src/schema/category.schema";
import mongoose from "mongoose";
import { getTasksIds } from "../config/tasks";
import { getCategoriesIds } from "../config/categories";

let seed: RunSeed;
const url = "http://localhost:9999";

beforeAll(async () => {
  seed = new RunSeed();
  seed.serverStarter();
  await seed.database();
  seed.insertUserBase(UserModel.collection.name);
  seed.insertCategoryBase(CategoryModel.collection.name);
  seed.insertTaskBase(TaskModel.collection.name);
});

describe("Testing tasks endpoints", () => {
  it("Should create a task", async () => {
    try {
      const userMock = {
        username: "Dora E",
        weight: 66,
        password: "abcdefghi",
        email: "dorae@gmail.com",
      };
      const responseUser = await request(url).post("/user").send(userMock);
      const userId = new mongoose.Types.ObjectId(responseUser.body._id);
      const categoryMock = {
        name: "Category Test",
        color: "Blue",
        user: userId,
      };

      const responseCategory = await request(url)
        .post("/category")
        .send(categoryMock);
      const categoryId = new mongoose.Types.ObjectId(responseCategory.body._id);
      const taskMock = {
        title: "Task Title",
        description: "Description",
        type: "Type1",
        category: categoryId,
        status: TaskStatus.COMPLETED,
        user: userId,
      };

      const responseTask = await request(url).post("/task").send(taskMock);

      expect(responseTask.status).toBe(201);
      const findTask = await TaskModel.findById(responseTask.body._id);
      expect(findTask?.title).toBe(taskMock.title);
      expect(findTask?.description).toBe(taskMock.description);
      expect(findTask?.type).toBe(taskMock.type);
    } catch (error) {
      console.log(`Falhei no teste de criar uma task. Erro: ${error}`);
    }
  });

  it("Should find tasks by category", async () => {
    const categoriesIds = await getCategoriesIds();
    const categoryId = categoriesIds[0];
    const response = await request(url).get(`/task/find/${categoryId}`);
    console.log(response.body[0].title);
    expect(response.status).toBe(200);
    expect(response.body[0].title).toBe("Task 1");
  });

  it("Should update a task", async () => {
    const tasksIds = await getTasksIds();
    const taskId = tasksIds[0];
    const newTaskData = {
      title: "New Task Test",
      description: "New description Task",
    };
    const updateTask = await request(url)
      .put(`/task/${taskId}`)
      .send(newTaskData);

    expect(updateTask.status).toEqual(200);
    const updated = await TaskModel.findById(taskId);
    expect(updated?.title).toBe(newTaskData.title);
    expect(updated?.description).toBe(newTaskData.description);
  });

  it("Should delete a task", async () => {
    const tasksIds = await getTasksIds();
    const taskId = tasksIds[0];

    const response = await request(url).delete(`/task/${taskId}`);
    expect(response.status).toEqual(204);
  });
});
afterAll(async () => {
  await seed.deleteAllDocuments(UserModel.collection.name);
  await seed.dropDatabase();
  await seed.closeDatabaseConnection();
  seed.closeConnection();
});
