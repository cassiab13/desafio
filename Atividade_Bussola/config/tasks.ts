import TaskModel from "../src/schema/task.schema";
import { TaskStatus } from "./../src/enums/task.status";
import { createCategories, getCategoriesIds } from "./categories";
import { createUsers, getUsersIds } from "./users";

const createTasks = async () => {
  createUsers();
  const usersIds = await getUsersIds();
  createCategories();
  const categoriesIds = await getCategoriesIds();
  const tasks = [
    {
      title: "Task 1",
      type: "Important",
      category: categoriesIds[0],
      status: TaskStatus.PENDING,
      user: usersIds[0],
    },
    {
      title: "Task 2",
      type: "Important",
      category: categoriesIds[1],
      status: TaskStatus.COMPLETED,
      user: usersIds[1],
    },
    {
      title: "Task 3",
      type: "Important",
      category: categoriesIds[0],
      status: TaskStatus.IN_PROGRESS,
      user: usersIds[0],
    },
  ];
  return tasks;
};

const getTasksIds = async () => {
  try {
    const tasks = await TaskModel.find({}, "_id");
    const tasksIds = tasks.map((task) => task._id);

    return tasksIds;
  } catch (error) {
    console.error("Erro ao recuperar IDs dos usuários:", error);
    return [];
  }
};

export { createTasks, getTasksIds };
