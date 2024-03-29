export class UserDto {
  id: String;
  username: String;
  weight: Number;
  password: String;
  email: String;

  constructor(
    id: String,
    username: String,
    weight: Number,
    password: String,
    email: String
  ) {
    this.id = id;
    this.username = username;
    this.weight = weight;
    this.password = password;
    this.email = email;
  }
}
