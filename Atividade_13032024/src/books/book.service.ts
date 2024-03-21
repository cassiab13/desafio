import bookModel from './book.schema'

export class BookService {
  async create(book: any) {
    const createdBook = bookModel.create(book);
    return createdBook;
  }

  async findById(id: any) {
    const findedBook = await bookModel.findById(id);
    return findedBook;
  }

  async findAll() {
    const findAllBooks = await bookModel.find();
    return findAllBooks;
  }

  async updateOneBook(id: any, book: any) {
    const updatedBook = await bookModel.updateOne({ _id: id }, { $set: book });
    return updatedBook;
  }

  async deleteBookById(id: any) {
    const deletedBook = await bookModel.findByIdAndDelete(id);
    return deletedBook;
  }
}