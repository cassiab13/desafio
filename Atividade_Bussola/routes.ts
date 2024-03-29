import { Router } from "express";
import userController from "./src/controller/user.controller";

const routes = Router();

routes.post("/user", userController.create);
routes.post("/login", userController.authenticate);
routes.get("/user/:username", userController.findAllFilterByUsername);

export { routes };
