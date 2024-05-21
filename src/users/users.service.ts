import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/User.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ColumnEntity } from '../database/entities/Column.entity';
import { CreateColumnDto } from './dtos/create-column.dto';
import { CreateCardDto } from './dtos/create-card.dto';
import { CardEntity } from '../database/entities/Card.entity';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CommentEntity } from '../database/entities/Comment.entity';
import { UpdateCardDto } from './dtos/update-card.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(ColumnEntity)
    private columnsRepository: Repository<ColumnEntity>,
    @InjectRepository(CardEntity)
    private cardsRepository: Repository<CardEntity>,
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>,
  ) {}

  async create(userDto: CreateUserDto) {
    const candidate = await this.findOneByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'User with this email exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    return this.usersRepository.save({ ...userDto, password: hashPassword });
  }

  async update(userDto: CreateUserDto, authUserId: number) {
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    return this.usersRepository.update(
      { id: authUserId },
      { ...userDto, password: hashPassword },
    );
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findById(id: number) {
    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) throw new NotFoundException('User not exists');
    return user;
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email: email });
  }

  async remove(id: number) {
    return this.usersRepository.delete({ id: id });
  }

  async createColumn(columnDto: CreateColumnDto, authUserId: number) {
    const user = await this.usersRepository.findOneBy({ id: authUserId });
    const newColumn = this.columnsRepository.create({
      ...columnDto,
      user: user,
    });
    return this.columnsRepository.save(newColumn);
  }

  async updateColumn(
    columnDto: CreateColumnDto,
    columnId: number,
    authUserId: number,
  ) {
    const user = await this.usersRepository.findOne({
      where: { id: authUserId, columns: { id: columnId } },
    });
    if (!user) throw new NotFoundException('Invalid path data');
    return this.columnsRepository.update({ id: columnId }, { ...columnDto });
  }

  async findColumns(id: number) {
    return this.usersRepository.find({
      where: { id: id },
      relations: { columns: { cards: { comments: true } } },
    });
  }

  async findColumn(userId: number, columnId: number) {
    return this.usersRepository.findOne({
      where: { id: userId, columns: { id: columnId } },
      relations: { columns: { cards: { comments: true } } },
    });
  }

  async removeColumn(columnId: number, authUserId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: authUserId, columns: { id: columnId } },
    });
    if (!user) throw new NotFoundException('Invalid path data');
    return this.columnsRepository.delete({ id: columnId });
  }

  async createCard(
    cardDto: CreateCardDto,
    columnId: number,
    authUserId: number,
  ) {
    const user = await this.usersRepository.findOne({
      where: { id: authUserId, columns: { id: columnId } },
    });
    if (!user) throw new NotFoundException('Invalid path data');
    const column = await this.columnsRepository.findOneBy({ id: columnId });
    const newCard = this.cardsRepository.create({ ...cardDto, column: column });
    return this.cardsRepository.save(newCard);
  }

  async updateCard(cardDto: CreateCardDto, cardId: number, authUserId: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: authUserId,
        columns: { cards: { id: cardId } },
      },
    });
    if (!user) throw new NotFoundException('Card not found');
    return this.cardsRepository.update({ id: cardId }, { ...cardDto });
  }

  async updateCardColumn(
    cardDto: UpdateCardDto,
    cardId: number,
    authUserId: number,
  ) {
    const user = await this.usersRepository.findOne({
      where: { id: authUserId, columns: { cards: { id: cardId } } },
    });
    if (!user) throw new NotFoundException('Card not found');
    const column = await this.columnsRepository.findOneBy({
      id: cardDto.columnId,
      user: { id: authUserId },
    });
    if (!column) throw new NotFoundException('Column not found');
    return this.cardsRepository.update({ id: cardId }, { column: column });
  }

  async findCard(userId: number, cardId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId, columns: { cards: { id: cardId } } },
      relations: { columns: { cards: true } },
    });
    if (!user) throw new NotFoundException('Invalid path data');
    return this.cardsRepository.findOne({
      where: { id: cardId },
      relations: { comments: true },
    });
  }

  async removeCard(cardId: number, authUserId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: authUserId, columns: { cards: { id: cardId } } },
    });
    if (!user) throw new NotFoundException('No access');
    return this.cardsRepository.delete({ id: cardId });
  }

  async createComment(
    commentDto: CreateCommentDto,
    cardId: number,
    authUserId: number,
  ) {
    const user = await this.usersRepository.findOneBy({ id: authUserId });
    const card = await this.cardsRepository.findOneBy({ id: cardId });
    if (!card) throw new NotFoundException('Card not found');
    const newComment = this.commentsRepository.create({
      ...commentDto,
      user: user,
      card: card,
    });
    return this.commentsRepository.save(newComment);
  }

  async updateComment(
    commentDto: CreateCommentDto,
    commentId: number,
    authUserId: number,
  ) {
    const comment = await this.commentsRepository.findOne({
      where: { user: { id: authUserId } },
    });
    if (!comment) throw new NotFoundException('Invalid path data');
    return this.commentsRepository.update({ id: commentId }, { ...commentDto });
  }

  async findAllComments(cardId: number) {
    return this.commentsRepository.findAndCount({
      where: { card: { id: cardId } },
    });
  }

  async findComments(cardId: number, page: number, limit: number) {
    return this.commentsRepository.findAndCount({
      where: { card: { id: cardId } },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async removeComment(commentId: number, authUserId: number) {
    const comment = await this.commentsRepository.findOne({
      where: { user: { id: authUserId } },
    });
    if (!comment) throw new NotFoundException('No access');
    return this.commentsRepository.delete({ id: commentId });
  }
}
