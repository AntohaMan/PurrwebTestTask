import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({ example: 'My new Card', description: 'Card title' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 'This is my new Card',
    description: 'Card description',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
