import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/User.entity';
import { ColumnEntity } from '../database/entities/Column.entity';
import { CardEntity } from '../database/entities/Card.entity';
import { CommentEntity } from '../database/entities/Comment.entity';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ColumnEntity,
      CardEntity,
      CommentEntity,
    ]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
