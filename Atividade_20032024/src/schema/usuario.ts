import { Schema, model } from "mongoose";

const userSchema = new Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  peso: Number,
  senha: String,
  email: String,
});
