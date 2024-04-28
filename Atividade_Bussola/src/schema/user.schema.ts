import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  weight: { type: Number, required: true, min: 0 },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  email: { type: String, required: true },
});

const UserModel = model("user", userSchema);
export default UserModel;
