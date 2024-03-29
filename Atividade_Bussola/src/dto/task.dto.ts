export class TaskDto {
  title: string;
  description?: string;
  creationDate?: Date;
  finishDate?: Date;
  type: String;
  categoryId: string;
  status: "pending" | "in_progress" | "completed";
  userId: string;

  constructor(
    title: string,
    type: string,
    categoryId: string,
    status: "pending" | "in_progress" | "completed",
    userId: string,
    description?: string,
    creationDate?: Date,
    finishDate?: Date
  ) {
    this.title = title;
    this.description = description;
    this.creationDate = creationDate;
    this.finishDate = finishDate;
    this.type = type;
    this.categoryId = categoryId;
    this.status = status;
    this.userId = userId;
  }
}
