import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateProdutoDto {
    @IsString()
    @MinLength(3)
    @MaxLength(40)
    nome: string;
  
    @IsNumber()
    @Min(1)
    @Max(100)
    valor: number;
    
    @IsNumber()
    @Min(1)
    @Max(50)
    quantidade: number;
}
