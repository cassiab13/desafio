import { UserDto } from "../dto/userDto";
import { UserRepository } from "../repository/userRepository";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(userDto: UserDto) {
    return this.userRepository.create(userDto);
  }

  async findByUsername(username: string) {
    return this.userRepository.findByUsername(username);
  }

  async authenticate(username: string, password: string) {
    return this.userRepository.authenticate(username, password);
  }
}
