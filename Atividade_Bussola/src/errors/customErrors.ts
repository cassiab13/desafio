export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AuthenticationError extends CustomError {
  constructor() {
    super("Usuário não encontrado ou senha incorreta");
  }
}

export class UserNotFoundError extends CustomError {
  constructor() {
    super("Usuário não encontrado");
  }
}

export class IncorrectPasswordError extends CustomError {
  constructor() {
    super("Senha incorreta");
  }
}


export class TaskCannotBeCreated extends CustomError {
  constructor() {
    super("Tarefa não pode ser criada. Preencha os campos obrigatórios");
  }
}

export class InternalError extends CustomError {
  constructor() {
    super("Falha na conexão");
  }
}