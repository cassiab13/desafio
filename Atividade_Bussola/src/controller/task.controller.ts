import { TaskCannotBeCreated, InternalError } from "./../errors/customErrors";
import { Request, Response } from "express";
import { TaskService } from "../service/task.service";
import { TaskDto } from "../dto/task.dto";

class TaskController {
  async create(req: Request, res: Response) {
    try {
      const taskDto: TaskDto = req.body;
      if (!taskDto.title || !taskDto.type) {
        return res.status(400).json({ TaskCannotBeCreated });
      }
      const newTask = await new TaskService().create(req.body);
      return res.json(newTask);
    } catch (error) {
      return res.status(500).json({ InternalError });
    }
  }
}

export default new TaskController();
