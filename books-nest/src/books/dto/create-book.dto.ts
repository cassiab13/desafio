import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(3)
  @MaxLength(40)
  name: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  price: number;
  
  author: string;
  ISBN: string;
}
