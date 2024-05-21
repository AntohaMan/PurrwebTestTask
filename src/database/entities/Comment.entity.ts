import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { CommonEntity } from './Common.entity';
import { CardEntity } from './Card.entity';
import { UserEntity } from './User.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('comments')
export class CommentEntity extends CommonEntity {
  @ApiProperty({ example: 'Good work!', description: 'Card comment' })
  @Column()
  text: string;

  // @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  // @ApiProperty({ type: () => CardEntity })
  @ManyToOne(() => CardEntity, (card) => card.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'card_id' })
  card: CardEntity;

  @ApiProperty({ type: Date })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ type: Date })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
