import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterAll,
} from "@jest/globals";
import UserModel from "../src/schema/user.schema";
import { RunSeed } from "./../config/seed";
import request from "supertest";

let seed: RunSeed;

beforeAll(async () => {
  seed = new RunSeed();
  await seed.serverStarter();
});

beforeEach(async () => {
  await seed.database();
  await seed.insertUserBase(UserModel.collection.name);
});

describe("Testing users endpoints", () => {
  const url = "http://localhost:9999";

  it("Should create a user", async () => {
    const userMock = {
      username: "Dora E",
      weight: 66,
      password: "abcdefghi",
      email: "dorae@gmail.com",
    };

    const response = await request(url).post("/user").send(userMock);
    console.log(`Inseri o usuário:${userMock.username}`);
    const findUser = await UserModel.findById(response.body._id);
    expect(response.body._id).toBeDefined();
    expect(findUser?.username).toBe(userMock.username);
    expect(findUser?.weight).toBe(userMock.weight);
  });

  it("Should creat a category", async () => {});

  it("Should find a user by username", async () => {
    const username = "alice";
    const response = await request(url)
      .get(`/user/${username}`)
      .query({ username });
    expect(response.body.username).toBe(username);
  });

  it("Should find all category by user id", async () => {
    const userMock = {
      username: "Dora E",
      weight: 66,
      password: "abcdefghi",
      email: "dorae@gmail.com",
    };
    const response = await request(url).post("/user").send(userMock);
    const id = await UserModel.findById(response.body._id);
    const findAllCategoryByUserId = await request(url).get(
      `/category/user/${id}`
    );
    expect(findAllCategoryByUserId.status).toBe(200);
    expect(findAllCategoryByUserId.body).toHaveLength(0);
  });
});

afterEach(async () => {
  await seed.deleteAllDocuments(UserModel.collection.name);
  await seed.dropDatabase();
  await seed.closeDatabaseConnection();
});

afterAll(async () => {
  await seed.closeConnection();
});
