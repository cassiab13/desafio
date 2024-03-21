import { Request, Response } from "express";
import { BookService } from "./book.service";

class BookController {
  async create(req: Request, res: Response) {
    const book = await new BookService().create(req.body);
    return res.json(book);
  }

  async findById(req: Request, res: Response) {
    const book = await new BookService().findById(req.params.id);
    return res.json(book);
  }

  async findAll(req: Request, res: Response) {
    const books = await new BookService().findAll();
    return res.json(books);
  }

  async updateOneBook(req: Request, res: Response) {
    const updatedBook = await new BookService().updateOneBook(
      req.params.id,
      req.body
    );
    return res.json(updatedBook);
  }

  async deleteBookById(req: Request, res: Response) {
    const deleteBook = await new BookService().deleteBookById(req.params.id);
    return res.json(deleteBook);
  }
}
export default new BookController();

/*Sugestões de melhoria:
1 - fazer o tratamento de erros com o try / catch
2 - Inserir o status dos erros, caso eles aconteçam
3 - Criar uma factory para criar as classes dos controllers e services ou um 
container para injeção de dependência.
4 - Adicionar testes unitários
5 - Utilizar DTO (transferir dados entre a camada de apresentação
    e a camada de serviços) e DAO (encapsulamento da lógica de acesso a dados através de uma interface)

Factory interface:
import { BookService } from './book.service';
import BookController from './book.controller';

interface ControllerFactory {
    createBookController(): BookController;
}

export default ControllerFactory;

Factory Concrete
import { BookService } from './book.service';
import BookController from './book.controller';

class ConcreteControllerFactory implements ControllerFactory {
    private bookService: BookService;

    constructor(bookService: BookService) {
        this.bookService = bookService;
    }

    createBookController(): BookController {
        return new BookController(this.bookService);
    }
}

export default ConcreteControllerFactory;



*/
