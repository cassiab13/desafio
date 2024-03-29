import { TaskDto } from "../dto/task.dto";
import taskModel from "../schema/task.schema";

export class TaskRepository {
  async create(taskDto: TaskDto) {
    const task = new taskModel({
      title: taskDto.title,
      description: taskDto.description,
      creationDate: taskDto.creationDate,
      finishDate: taskDto.finishDate,
      type: taskDto.type,
      categoryId: taskDto.categoryId,
      status: taskDto.status,
      userId: taskDto.userId,
    });
    return task.save();
  }
}
