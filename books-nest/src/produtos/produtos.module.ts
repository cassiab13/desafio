import { ProdutosService } from './produtos.service';
import { Module } from '@nestjs/common';
import { ProdutosController } from './produtos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Produto, ProdutoSchema } from './schema/produto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Produto.name, schema: ProdutoSchema }]),
  ],
  controllers: [ProdutosController],
  providers: [ProdutosService],
})
export class ProdutosModule {}