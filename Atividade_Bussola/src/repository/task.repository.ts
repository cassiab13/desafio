import { TaskDto } from "../dto/task.dto";
import taskSchema from "../schema/task.schema";
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
}