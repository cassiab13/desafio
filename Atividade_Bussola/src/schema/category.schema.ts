import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
});

const CategoryModel = model("Category", categorySchema);
export default CategoryModel;
