import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import UserModel from "../src/schema/user.schema";
import { RunSeed } from "./../config/seed";
import request from "supertest";
import { createUsers } from "../config/users";

let seed: RunSeed;
const url = "http://localhost:9999";

beforeAll(async () => {
  seed = new RunSeed();
  seed.serverStarter();
  seed.database();
});

describe("Testing user endpoints", () => {
  it("Should create a user", async () => {
    const users = createUsers();
    const user = users[Math.floor(Math.random() * users.length)];

    const response = await request(url).post("/user").send(user);
    const findUser = await UserModel.findById(response.body._id);

    expect(response.body._id).toBeDefined();
    expect(findUser?.username).toBe(user.username);
    expect(findUser?.weight).toBe(user.weight);
  });
});

afterAll(async () => {
  await seed.deleteAllDocuments(UserModel.collection.name);
  await seed.dropDatabase();
  await seed.closeDatabaseConnection();
  seed.closeConnection();
});
