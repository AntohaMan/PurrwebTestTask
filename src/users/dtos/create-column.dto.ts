import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
  @ApiProperty({ example: 'My new column', description: 'Column title' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;
}
