import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
//import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './schema/produto.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProdutosService {
  constructor(@InjectModel(Produto.name) private produtoModel: Model<Produto>) {}

  create(createProdutoDto: CreateProdutoDto) {
    const createdProduto = this.produtoModel.create(createProdutoDto);
    return createdProduto;
  }

  findAll() {
    return this.produtoModel.find();
  }

  findById(id: string) {
    return this.produtoModel.findById(id);
  }

  // update(id: string, updateprodutoDto: UpdateprodutoDto) {
  //   return `This action updates a #${id} produto`;
  // }

  remove(id: string) {
    return this.produtoModel.findByIdAndDelete(id);
  }
}

