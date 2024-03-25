import { Schema, model } from "mongoose";
import CategoryModel from "./category";
import UserModel from "./user";

const taskSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  creationDate: { type: Date },
  finishDate: { type: Date },
  type: { type: String, required: true },
  category: CategoryModel,
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed"],
    required: true,
  },
  user: UserModel,
});

export default model("Task", taskSchema);
