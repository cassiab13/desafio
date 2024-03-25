import { Schema, model } from "mongoose";

const userSchema = new Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  weight: { type: Number, required: true, min: 0 },
  password: {
    type: String,
    required: true,
    min: 8,
    validate: {
      validator: function (password: string) {
        return /[!@#$%^&*(),.?":{}|<>]/.test(password);
      },
      message: (props: { value: any }) =>
        `${props.value} precisa conter pelo menos um caracter especial`,
    },
  },
  email: { type: String, required: true },
});

const UserModel = model("User", userSchema);
export default UserModel;
