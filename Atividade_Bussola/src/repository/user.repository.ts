import { UserDto } from "../dto/user.dto";
import userModel from "../schema/user.schema";
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

  async findAll() {
    return await userModel.find();
  }

  async findAllFilterByUsername(username: String) {
    const users = await this.findAll();
    const filteredUsers = users.filter((user) => user.username === username);
    return filteredUsers.length > 0 ? filteredUsers[0] : null;
  }

  async authenticate(username: string, password: string) {
    const user = await this.findAllFilterByUsername(username);

    if (!user) return null;
    const passwordMatch = await bcrypt.compare(password, user.password);
    return passwordMatch ? user : null;
  }
}
