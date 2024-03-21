import { Schema, model } from "moongose";

const noteSchema = new Schema({
  title: { type: String, required: true },
  subject: { type: String },
  projectedStudyHours: { type: Number, required: true },
});

export default model("Note", noteSchema);
