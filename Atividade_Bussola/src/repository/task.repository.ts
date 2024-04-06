import { TaskDto } from "../dto/task.dto";
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

  async findTasksByDate(
    startDate: string,
    endDate: string
  ): Promise<TaskDto[]> {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const tasks = await taskSchema.find({
        dueDate: {
          $gte: start,
          $lte: end,
        },
      });
      const mappedTasks: TaskDto[] = tasks.map((task) => ({
        title: task.title,
        description: task.description,
        creationDate: task.creationDate,
        finishDate: task.finishDate,
        type: task.type,
        category: task.category?.toString(),
        status: task.status,
        user: task.user?.toString(),
      }));
      return mappedTasks;
    } catch (error) {
      throw new Error("Erro ao buscar tarefas por período de vencimento");
    }
  }

  async findTaskWithLongestDescription(): Promise<TaskDto[]> {
    try {
      const tasks = await this.findAllTasks();
      if (tasks.length === 0)
        throw new Error("Não existem tarefas cadastradas");
      const longestDescription = tasks.reduce((previousTask, currentTask) => {
        if (!previousTask.description || !currentTask.description)
          return previousTask;
        return previousTask.description.length > currentTask.description.length
          ? previousTask
          : currentTask;
      });
      return [longestDescription];
    } catch (error) {
      throw new Error(
        "Não foi possível encontrar a tarefa com descrição mais longa"
      );
    }
  }

  async groupTasksByCategory(
    categoryId: string
  ): Promise<{ [category: string]: TaskDto[] }> {
    try {
      const filteredTasks = (await this.findAllTasks()).filter(
        (task) => task.category.toString() === categoryId
      );
      const groupedTasks = filteredTasks.reduce((acc, task) => {
        const category = task.category.toString();
        if (!acc[category]) acc[category] = [];
        acc[category].push(task);
        return acc;
      }, {} as { [category: string]: TaskDto[] });

      return groupedTasks;
    } catch (error) {
      throw new Error("Não foi possível agrupar por categoria");
    }
  }
}
