import { TaskStatus } from "../enums/task.status";

export class TaskDto {
  title: string;
  description?: string;
  creationDate?: Date;
  finishDate?: Date;
  type: string;
  category: string;
  status: TaskStatus;
  user: string;

  constructor(
    title: string,
    type: string,
    category: string,
    status: TaskStatus,
    user: string,
    description?: string,
    creationDate?: Date,
    finishDate?: Date
  ) {
    this.title = title;
    this.description = description;
    this.creationDate = creationDate;
    this.finishDate = finishDate;
    this.type = type;
    this.category = category;
    this.status = status;
    this.user = user;
  }
}
