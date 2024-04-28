import { ObjectId } from "mongoose";

export class CategoryDto {
  name: string;
  color: string;
  userId: string;

  constructor(name: string, color: string, userId: string) {
    this.name = name;
    this.color = color;
    this.userId = userId;
  }
}
