import { Schema, model, Types } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  user: { type: Types.ObjectId, ref: "User", required: true },
});

const CategoryModel = model("Category", categorySchema);
export default CategoryModel;
