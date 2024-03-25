import { UserDto } from "../dto/userDto";
import userModel from "../schema/userModel";
import bcrypt from "bcrypt";

export class UserRepository {
  async create(userDto: UserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password.toString(), 10);
    const user = new userModel({
      username: userDto.username,
      email: userDto.email,
      weight: userDto.weight,
      password: hashedPassword,
    });
    return user.save();
  }

  async findByUsername(username: string) {
    return userModel.findOne({ username });
  }

  async authenticate(username: string, password: string) {
    const user = await this.findByUsername(username);
    if (!user) return null;
    const passwordMatch = await bcrypt.compare(password, user.password);
    return passwordMatch ? user : null;
  }
}
