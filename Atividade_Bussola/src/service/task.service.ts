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

  async findMostRecentTaskByUser(userId: string) {
    return this.taskRepository.findMostRecentTaskByUser(userId);
  }

  async findOldestTaskByUser(userId: string) {
    return this.taskRepository.findOldestTaskByUser(userId);
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
    return this.taskRepository.filterTaskByCategory(categoryId);
  }

  async filterTasksByStatus(status: string) {
    return this.taskRepository.filterTasksByStatus(status);
  }

  async countTasksByUserId(userId: string) {
    return this.taskRepository.countTasksByUserId(userId);
  }

  async findTasksByDate(startDate: string, endDate: string) {
    return this.taskRepository.findTasksByDate(startDate, endDate);
  }

  async findTaskWithLongestDescription() {
    return this.taskRepository.findTaskWithLongestDescription();
  }

  async groupTasksByCategory(categoryId: string) {
    return this.taskRepository.groupTasksByCategory(categoryId);
  }
}
