import {
  UserNotFoundError,
  AuthenticationError,
  CannotBeCreated,
} from "../errors/customErrors";
import { Request, Response } from "express";
import { UserService } from "../service/user.service";
import { Http2ServerRequest } from "http2";
import { HttpStatus } from "src/enums/http.status";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const newUser = await new UserService().create(req.body);
      return res.status(HttpStatus.CREATED).json(newUser);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ CannotBeCreated });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const user = await new UserService().findAll();
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ UserNotFoundError });
    }
  }
  async findAllFilterByUsername(req: Request, res: Response) {
    try {
      const user = await new UserService().findAllFilterByUsername(
        req.params.username
      );
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ UserNotFoundError });
    }
  }

  async authenticate(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const authenticatedUser = await new UserService().authenticate(
        username,
        password
      );
      return res.status(HttpStatus.OK).json(authenticatedUser);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ AuthenticationError });
    }
  }
}
export default new UserController();
