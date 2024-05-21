import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { CommonEntity } from './Common.entity';
import { ColumnEntity } from './Column.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class UserEntity extends CommonEntity {
  @ApiProperty({ example: 'Ivanov Ivan', description: 'User name' })
  @Column()
  name: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '12345678', description: 'Password' })
  @Column()
  password: string;

  //@ApiProperty({ type: [ColumnEntity] })
  @OneToMany(() => ColumnEntity, (column) => column.user)
  columns: ColumnEntity[];

  @ApiProperty({ type: Date })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ type: Date })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
