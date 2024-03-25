import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  color: { type: String, required: true },
});

const CategoryModel = model("Category", categorySchema);
export default CategoryModel;
