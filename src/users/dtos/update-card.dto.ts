import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCardDto {
  @ApiProperty({ example: '1', description: 'Column id' })
  @IsNotEmpty()
  @IsNumber()
  columnId: number;
}
