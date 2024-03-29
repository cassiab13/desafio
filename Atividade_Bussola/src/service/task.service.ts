import { TaskDto } from "../dto/task.dto";
import { TaskRepository } from "../repository/task.repository";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async create(taskDto: TaskDto) {
    this.taskRepository.create(taskDto);
  }
}
