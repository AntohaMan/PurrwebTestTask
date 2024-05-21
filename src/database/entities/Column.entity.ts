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
import { UserEntity } from './User.entity';
import { CardEntity } from './Card.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('columns')
export class ColumnEntity extends CommonEntity {
  @ApiProperty({ example: 'My new column', description: 'Column title' })
  @Column()
  title: string;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.columns, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  //@ApiProperty({ type: [CardEntity] })
  @OneToMany(() => CardEntity, (card) => card.column)
  cards: CardEntity[];

  @ApiProperty({ type: Date })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ type: Date })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
