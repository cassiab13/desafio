import { Router } from "express";
import userController from "./src/controller/user.controller";
import categoryController from "./src/controller/category.controller";
import taskController from "./src/controller/task.controller";

const routes = Router();

routes.post("/user", userController.create);
routes.post("/login", userController.authenticate);
routes.get("/user/:username", userController.findAllFilterByUsername);

//Routes Category
routes.post("/category", categoryController.create);
routes.get(
  "/category/user/:userId",
  categoryController.findAllCategoryByUserId
);
routes.get("/category/:categoryId", categoryController.findCategoryById);
routes.put("/category/:categoryId", categoryController.updateCategory);
routes.delete("/category/:categoryId", categoryController.deleteCategory);

//Routes Task
routes.post("/task", taskController.create);
routes.get("/tasks/:userId", taskController.findAllTasksByUserId);
routes.get("/task/:taskId", taskController.findTaskById);
routes.put("/task/:taskId", taskController.updateTask);
routes.delete("/task/:taskId", taskController.deleteTask);
routes.get("/task/find/:categoryId", taskController.filterTaskByCategory);
routes.get("/task/status/:status", taskController.filterTasksByStatus);
routes.get("/task/count/:userId", taskController.countTasksByUserId);
routes.get("/task/recent/:userId", taskController.findMostRecentTaskByUser);
routes.get("/task/oldest/:userId", taskController.findOldestTaskByUser);
routes.get(
  "/tasks/due-date/:startDate/:endDate",
  taskController.findTasksByDate
);
routes.get("/tasks/longest", taskController.findTaskWithLongestDescription);
routes.get("/tasks/group/:categoryId", taskController.groupTasksByCategory);

export { routes };
