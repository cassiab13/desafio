import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
//import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    try{
      return this.booksService.create(createBookDto);
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findById(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
  //   return this.booksService.update(id, updateBookDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
