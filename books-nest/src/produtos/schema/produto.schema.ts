import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProdutoDocument = HydratedDocument<Produto>;

@Schema()
export class Produto {
  @Prop()
  nome: string;

  @Prop()
  valor: number;

  @Prop()
  quantidade: number;
}

export const ProdutoSchema = SchemaFactory.createForClass(Produto);