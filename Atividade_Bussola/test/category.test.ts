import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import { RunSeed } from "./../config/seed";
import request from "supertest";
import CategoryModel from "../src/schema/category.schema";
import UserModel from "../src/schema/user.schema";
import { getCategoriesIds } from "../config/categories";

let seed: RunSeed;
const url = "http://localhost:9999";

beforeAll(async () => {
  seed = new RunSeed();
  seed.serverStarter();
  seed.database();
  seed.insertUserBase(UserModel.collection.name);
  seed.insertCategoryBase(CategoryModel.collection.name);
});

describe("Testing category endpoints", () => {
  it("Should create a category", async () => {
    try {
      const categoryMock = {
        name: "Category Test Mock",
        color: "Mock Color",
      };
      const responseCategory = await request(url)
        .post("/category")
        .send(categoryMock);

      expect(responseCategory.status).toBe(201);

      const findCategory = await CategoryModel.findById(
        responseCategory.body._id
      );
      expect(findCategory?.name).toBe(categoryMock.name);
      expect(findCategory?.color).toBe(categoryMock.color);
    } catch (error) {
      console.log(`Não consegui criar uma categoria: ${error}`);
    }
  });

  it("Should find all category by user id", async () => {
    try {
      const categoriesIds = await getCategoriesIds();
      const categoryId0 = categoriesIds[0];
      const responseFindCategory = await request(url).get(
        `/category/${categoryId0}`
      );
      const userId = responseFindCategory.body.userId;
      const response = await request(url).get(`/category/user/${userId}`);

      expect(response.status).toBe(200);
    } catch (error) {
      console.log(`Erro na busca de todas as categorias por usuário: ${error}`);
    }
  });

  it("Should update category", async () => {
    const categoriesIds = await getCategoriesIds();
    const categoryId = categoriesIds[0];
    const newCategoryData = {
      name: "New Category Test",
      color: "Green",
    };

    const updateResponse = await request(url)
      .put(`/category/${categoryId}`)
      .send(newCategoryData);
    expect(updateResponse.status).toEqual(200);
    const updated = await CategoryModel.findById(categoryId);
    expect(updated?.name).toBe(newCategoryData.name);
    expect(updated?.color).toBe(newCategoryData.color);
  });

  it("Should delete a category", async () => {
    const categoriesIds = await getCategoriesIds();
    const categoryId = categoriesIds[0];
    const deleteCategory = await request(url).delete(`/category/${categoryId}`);
    expect(deleteCategory.status).toEqual(204);
  });
});
afterAll(async () => {
  await seed.deleteAllDocuments(UserModel.collection.name);
  await seed.deleteAllDocuments(CategoryModel.collection.name);
  await seed.dropDatabase();
  await seed.closeDatabaseConnection();
  seed.closeConnection();
});
