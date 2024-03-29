import { TaskDto } from "../dto/task.dto";
import { TaskRepository } from "../repository/task.repository";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async create(taskDto: TaskDto) {
    return this.taskRepository.create(taskDto);
  }

  async findAllTasks() {
    return this.taskRepository.findAllTasks();
  }
  async findAllTasksByUserId(userId: string) {
    return this.taskRepository.findAllTasksByUserId(userId);
  }

  async findTaskById(taskId: string) {
    return this.taskRepository.findTaskById(taskId);
  }

  async updateTask(taskId: string, taskDto: TaskDto) {
    return this.taskRepository.updateTask(taskId, taskDto);
  }

  async deleteTask(taskId: string) {
    return this.taskRepository.deleteTask(taskId);
  }

  async filterTaskByCategory(categoryId: string) {
    const allTasks = await this.taskRepository.findAllTasks();
    const filteredTasks = allTasks.filter(task => task.category === categoryId)
    console.log(categoryId);
    console.log(filteredTasks);
    return filteredTasks;
  }
}
