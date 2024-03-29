import { UserDto } from "../dto/user.dto";
import { UserRepository } from "../repository/user.repository";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(userDto: UserDto) {
    return this.userRepository.create(userDto);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findAllFilterByUsername(username: string) {
    return this.userRepository.findAllFilterByUsername(username);
  }

  async authenticate(username: string, password: string) {
    return this.userRepository.authenticate(username, password);
  }
}
