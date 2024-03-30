import { TaskDto } from "../dto/task.dto";
import { TaskStatus } from "../enums/task.status";
import taskSchema from "../schema/task.schema";
import mongoose from "mongoose";
import { Types } from "mongoose";

export class TaskRepository {
  async create(taskDto: TaskDto) {
    const task = new taskSchema({
      title: taskDto.title,
      description: taskDto.description,
      creationDate: taskDto.creationDate,
      finishDate: taskDto.finishDate,
      type: taskDto.type,
      category: taskDto.category,
      status: taskDto.status,
      user: taskDto.user,
    });
    return task.save();
  }

  async findAllTasks(): Promise<TaskDto[]> {
    return await taskSchema.find();
  }

  async findAllTasksByUserId(userId: string): Promise<TaskDto[]> {
    try {
      const tasks = await taskSchema.find({ user: userId });
      return tasks.map((task) => ({
        title: task.title,
        description: task.description,
        creationDate: task.creationDate,
        finishDate: task.finishDate,
        type: task.type,
        category: task.category?.toString(),
        status: task.status,
        user: task.user?.toString(),
      }));
    } catch (error) {
      throw error;
    }
  }

  async sortTaskByCreationDate(userId: string): Promise<TaskDto[]> {
    const tasks = await this.findAllTasksByUserId(userId);
    if (tasks.length === 0) throw new Error("Não há tarefas para este usuário");
    const sortedTasks = [...tasks];
    sortedTasks.sort((a, b) => {
      if (a.creationDate && b.creationDate) {
        return b.creationDate.getTime() - a.creationDate.getTime();
      } else if (!a.creationDate && !b.creationDate) {
        return 0;
      } else if (!a.creationDate) {
        return 1;
      } else {
        return -1;
      }
    });
    return sortedTasks;
  }

  async findMostRecentTaskByUser(userId: string): Promise<TaskDto[]> {
    try {
      const sortedTasks = await this.sortTaskByCreationDate(userId);
      return [sortedTasks[0]];
    } catch (error) {
      throw error;
    }
  }

  async findOldestTaskByUser(userId: string): Promise<TaskDto[]> {
    try {
      const sortedTasks = await this.sortTaskByCreationDate(userId);
      return [sortedTasks[sortedTasks.length - 1]];
    } catch (error) {
      throw error;
    }
  }

  async findTaskById(taskId: string): Promise<TaskDto | string> {
    const task = await taskSchema.findById(taskId);
    if (!task) return "Tarefa não encontrada";
    return {
      title: task.title,
      description: task.description,
      creationDate: task.creationDate,
      finishDate: task.finishDate,
      type: task.type,
      category: task.category?.toString(),
      status: task.status,
      user: task.user?.toString(),
    };
  }

  async updateTask(taskId: string, task: TaskDto) {
    const updatedTask = await taskSchema.updateOne(
      { _id: taskId },
      {
        title: task.title,
        description: task.description,
        type: task.type,
        category: new Types.ObjectId(task.category),
        status: task.status,
      }
    );
    return updatedTask;
  }

  async deleteTask(taskId: string) {
    try {
      await taskSchema.findByIdAndDelete(taskId);
      return "Tarefa deletada com sucesso";
    } catch (error) {
      throw new Error(`Erro ao remover a tarefa: ${error}`);
    }
  }

  async filterTaskByCategory(categoryId: string): Promise<TaskDto[]> {
    try {
      return (await this.findAllTasks())
        .filter(
          (task) =>
            String(task.category) ===
            new mongoose.Types.ObjectId(categoryId).toString()
        )
        .map((task) => ({
          title: task.title,
          description: task.description,
          creationDate: task.creationDate,
          finishDate: task.finishDate,
          type: task.type,
          category: task.category?.toString(),
          status: task.status,
          user: task.user?.toString(),
        }));
    } catch (error) {
      throw error;
    }
  }

  async filterTasksByStatus(status: string): Promise<TaskDto[]> {
    try {
      console.log(status);
      return (await this.findAllTasks())
        .filter(
          (task) => String(task.status).toUpperCase() === status.toUpperCase()
        )
        .map((task) => ({
          title: task.title,
          description: task.description,
          creationDate: task.creationDate,
          finishDate: task.finishDate,
          type: task.type,
          category: task.category?.toString(),
          status: task.status,
          user: task.user?.toString(),
        }));
    } catch (error) {
      throw error;
    }
  }

  async countTasksByUserId(userId: string): Promise<number> {
    try {
      return await taskSchema.countDocuments({ user: userId });
    } catch (error) {
      throw error;
    }
  }
}