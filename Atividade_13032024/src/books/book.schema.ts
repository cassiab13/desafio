import { Schema, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: String,
    author: String,
    ISBN: String,
    pageNumber: Number,
  },
  {
    timestamps: true,
  }
);

export default model("Books", bookSchema);

/*Sugestões de melhoria:
1 - Incluir o type: antes do tipo de dado
2 - Definir se ele é obrigatório e se ele será único (como o ISBN)*/
