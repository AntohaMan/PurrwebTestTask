import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'Good work!', description: 'Card comment' })
  @IsNotEmpty()
  @IsString()
  readonly text: string;
}
