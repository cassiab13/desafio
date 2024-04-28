import mongoose, { Schema, model, ObjectId } from "mongoose";
import { TaskStatus } from "../enums/task.status";

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  creationDate: { type: Date },
  finishDate: { type: Date },
  type: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  status: {
    type: String,
    enum: Object.values(TaskStatus),
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const TaskModel = model("Task", taskSchema);
export default TaskModel;
