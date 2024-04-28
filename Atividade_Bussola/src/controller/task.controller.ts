import {
  CannotBeCreated,
  InternalError,
  NotFound,
} from "./../errors/customErrors";
import { Request, Response } from "express";
import { TaskService } from "../service/task.service";
import { TaskDto } from "../dto/task.dto";
import { HttpStatus } from "src/enums/http.status";

class TaskController {
  async create(req: Request, res: Response) {
    try {
      const taskDto: TaskDto = req.body;
      if (!taskDto.title || !taskDto.type) {
        return res.status(HttpStatus.BAD_REQUEST).json({ CannotBeCreated });
      }
      const newTask = await new TaskService().create(req.body);
      return res.status(HttpStatus.CREATED).json(newTask);
    } catch (error) {
      return res.status(500).json({ InternalError });
    }
  }

  async findAllTasks(req: Request, res: Response) {
    return await new TaskService().findAllTasks();
  }

  async findAllTasksByUserId(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const tasks = await new TaskService().findAllTasksByUserId(userId);
      return res.status(HttpStatus.OK).json(tasks);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({ NotFound });
    }
  }

  async findMostRecentTaskByUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      return res
        .status(HttpStatus.OK)
        .json(await new TaskService().findMostRecentTaskByUser(userId));
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ InternalError });
    }
  }

  async findOldestTaskByUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      return res
        .status(HttpStatus.OK)
        .json(await new TaskService().findOldestTaskByUser(userId));
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ InternalError });
    }
  }

  async findTaskById(req: Request, res: Response) {
    try {
      const taskid = req.params.taskId;
      const task = await new TaskService().findTaskById(taskid);
      return res.status(HttpStatus.OK).json(task);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ InternalError });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const taskId = req.params.taskId;
      const updatedFields = req.body;
      const updatedTask = await new TaskService().updateTask(
        taskId,
        updatedFields
      );
      return res.status(HttpStatus.OK).json(updatedTask);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ InternalError });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const taskId = req.params.taskId;
      const deletedTask = await new TaskService().deleteTask(taskId);
      return res.status(HttpStatus.NO_CONTENT).json(deletedTask);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ InternalError });
    }
  }

  async filterTaskByCategory(req: Request, res: Response) {
    try {
      const categoryId = req.params.categoryId;
      const tasks = await new TaskService().filterTaskByCategory(categoryId);
      return res.status(HttpStatus.OK).json(tasks);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ InternalError });
    }
  }

  async filterTasksByStatus(req: Request, res: Response) {
    try {
      const status = req.params.status;
      return res
        .status(HttpStatus.OK)
        .json(await new TaskService().filterTasksByStatus(status));
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ InternalError });
    }
  }

  async countTasksByUserId(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      return res
        .status(HttpStatus.OK)
        .json(await new TaskService().countTasksByUserId(userId));
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ InternalError });
    }
  }

  async findTasksByDate(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.params;
      const tasks = await new TaskService().findTasksByDate(startDate, endDate);
      return res.status(HttpStatus.OK).json(tasks);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ InternalError });
    }
  }

  async findTaskWithLongestDescription(res: Response) {
    try {
      const tasks = await new TaskService().findTaskWithLongestDescription();
      return res.status(HttpStatus.OK).json(tasks);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ InternalError });
    }
  }

  async groupTasksByCategory(req: Request, res: Response) {
    try {
      const categoryId = req.params.categoryId;
      const tasks = await new TaskService().groupTasksByCategory(categoryId);
      return res.status(HttpStatus.OK).json(tasks);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ InternalError });
    }
  }
}
export default new TaskController();
