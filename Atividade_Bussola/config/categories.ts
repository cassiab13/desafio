import CategoryModel from "../src/schema/category.schema";
import { createUsers, getUsersIds } from "./users";

const createCategories = async () => {
  createUsers();
  const usersIds = await getUsersIds();
  const categories = [
    {
      name: "Category Test 1",
      color: "Blue",
      user: usersIds[0],
    },

    {
      name: "Category Test 2",
      color: "Green",
      user: usersIds[1],
    },

    {
      name: "Category Test 3",
      color: "Red",
      user: usersIds[0],
    },
  ];
  return categories;
};

const getCategoriesIds = async () => {
  try {
    const categories = await CategoryModel.find({}, "_id");
    const categoriesIds = categories.map((category) => category._id);

    return categoriesIds;
  } catch (error) {
    console.error("Erro ao recuperar IDs dos usuários:", error);
    return [];
  }
};

export { createCategories, getCategoriesIds };
