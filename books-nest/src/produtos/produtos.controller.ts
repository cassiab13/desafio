import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    try {
      return this.produtosService.create(createProdutoDto);  
    } catch (error){
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
    
  }

  @Get()
  findAll() {
    try{
      return this.produtosService.findAll();
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.produtosService.findById(id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Id inválido',
      }, HttpStatus.BAD_REQUEST)
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
  //   return this.produtosService.update(+id, updateProdutoDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.produtosService.remove(id);
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
