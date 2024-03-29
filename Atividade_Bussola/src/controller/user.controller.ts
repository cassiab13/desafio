import { UserNotFoundError, AuthenticationError } from "../errors/customErrors";
import { Request, Response } from "express";
import { UserService } from "../service/user.service";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const newUser = await new UserService().create(req.body);
      return res.json(newUser);
    } catch (error) {
      return console.log(error);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const user = await new UserService().findAll();
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ UserNotFoundError });
    }
  }
  async findAllFilterByUsername(req: Request, res: Response) {
    try {
      const user = await new UserService().findAllFilterByUsername(
        req.params.username
      );
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ UserNotFoundError });
    }
  }

  async authenticate(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const authenticatedUser = await new UserService().authenticate(
        username,
        password
      );
      return res.json(authenticatedUser);
    } catch (error) {
      return res.status(401).json({ AuthenticationError });
    }
  }
}
export default new UserController();
