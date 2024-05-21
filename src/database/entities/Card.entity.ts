import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { CommonEntity } from './Common.entity';
import { ColumnEntity } from './Column.entity';
import { CommentEntity } from './Comment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('cards')
export class CardEntity extends CommonEntity {
  @ApiProperty({ example: 'My new Card', description: 'Card title' })
  @Column()
  title: string;

  @ApiProperty({
    example: 'This is my new Card',
    description: 'Card description',
  })
  @Column()
  description: string;

  //@ApiProperty({ type: () => ColumnEntity })
  @ManyToOne(() => ColumnEntity, (column) => column.cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'column_id' })
  column: ColumnEntity;

  @ApiProperty({ type: [CommentEntity] })
  @OneToMany(() => CommentEntity, (comment) => comment.card)
  comments: CommentEntity[];

  @ApiProperty({ type: Date })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ type: Date })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
