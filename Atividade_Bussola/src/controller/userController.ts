import { Request, Response } from "express";
import { UserService } from "../service/userService";
import { AuthenticationError } from "../errors/customErrors";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const newUser = await new UserService().create(req.body);
      return res.json(newUser);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findByUsername(req: Request, res: Response) {
    try {
      const user = await new UserService().findByUsername(req.params.username);
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
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
      if (error instanceof AuthenticationError) {
        return res.status(401).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
}
export default new UserController();
