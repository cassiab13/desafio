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

export class CategoryNotFoundError extends CustomError {
  constructor() {
    super("Categoria não encontrada");
  }
}

export class IncorrectPasswordError extends CustomError {
  constructor() {
    super("Senha incorreta");
  }
}

export class CannotBeCreated extends CustomError {
  constructor() {
    super("Erro. Preencha os campos obrigatórios");
  }
}
export class NotFound extends CustomError {
  constructor() {
    super("Não foi possível encontrar");
  }
}

export class InternalError extends CustomError {
  constructor() {
    super("Falha na conexão");
  }
}