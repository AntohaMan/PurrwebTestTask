import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { CreateColumnDto } from './dtos/create-column.dto';
import { CreateCardDto } from './dtos/create-card.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCardDto } from './dtos/update-card.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from '../database/entities/User.entity';
import { ColumnEntity } from '../database/entities/Column.entity';
import { CardEntity } from '../database/entities/Card.entity';
import { CommentEntity } from '../database/entities/Comment.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: Object })
  @UseGuards(AccessTokenGuard)
  @Put()
  update(@Body() userDto: CreateUserDto, @Req() req) {
    return this.usersService.update(userDto, req.user.id);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserEntity] })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get one user' })
  @ApiResponse({ status: 200, type: UserEntity })
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @ApiOperation({ summary: 'Remove user' })
  @ApiResponse({ status: 200, type: Object })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @ApiOperation({ summary: 'Create column' })
  @ApiResponse({ status: 200, type: ColumnEntity })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('columns')
  createColumn(@Body() columnDto: CreateColumnDto, @Req() req) {
    return this.usersService.createColumn(columnDto, req.user.id);
  }

  @ApiOperation({ summary: 'Update column' })
  @ApiResponse({ status: 200, type: Object })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Put('columns/:columnId')
  updateColumn(
    @Body() columnDto: CreateColumnDto,
    @Param('columnId', ParseIntPipe) columnId: number,
    @Req() req,
  ) {
    return this.usersService.updateColumn(columnDto, columnId, req.user.id);
  }

  @ApiOperation({ summary: 'Get all columns' })
  @ApiResponse({ status: 200, type: [ColumnEntity] })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get(':userId/columns')
  findColumns(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.findColumns(userId);
  }

  @ApiOperation({ summary: 'Get one column' })
  @ApiResponse({ status: 200, type: ColumnEntity })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get(':userId/columns/:columnId')
  findColumn(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('columnId', ParseIntPipe) columnId: number,
  ) {
    return this.usersService.findColumn(userId, columnId);
  }

  @ApiOperation({ summary: 'Remove column' })
  @ApiResponse({ status: 200, type: Object })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete('columns/:columnId')
  removeColumn(@Param('columnId', ParseIntPipe) columnId: number, @Req() req) {
    return this.usersService.removeColumn(columnId, req.user.id);
  }

  @ApiOperation({ summary: 'Create card' })
  @ApiResponse({ status: 200, type: CardEntity })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('columns/:columnId/cards')
  createCard(
    @Body() cardDto: CreateCardDto,
    @Param('columnId', ParseIntPipe) columnId: number,
    @Req() req,
  ) {
    return this.usersService.createCard(cardDto, columnId, req.user.id);
  }

  @ApiOperation({ summary: 'Update card' })
  @ApiResponse({ status: 200, type: Object })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Put('cards/:cardId')
  updateCard(
    @Body() cardDto: CreateCardDto,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Req() req,
  ) {
    return this.usersService.updateCard(cardDto, cardId, req.user.id);
  }

  @ApiOperation({ summary: 'Update card column' })
  @ApiResponse({ status: 200, type: Object })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Patch('cards/:cardId')
  updateCardColumn(
    @Body() cardDto: UpdateCardDto,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Req() req,
  ) {
    return this.usersService.updateCardColumn(cardDto, cardId, req.user.id);
  }

  @ApiOperation({ summary: 'Find one card' })
  @ApiResponse({ status: 200, type: CardEntity })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get(':userId/cards/:cardId')
  findCard(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('cardId', ParseIntPipe) cardId: number,
  ) {
    return this.usersService.findCard(userId, cardId);
  }

  @ApiOperation({ summary: 'Remove card' })
  @ApiResponse({ status: 200, type: Object })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete('cards/:cardId')
  removeCard(@Param('cardId', ParseIntPipe) cardId: number, @Req() req) {
    return this.usersService.removeCard(cardId, req.user.id);
  }

  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({ status: 200, type: CommentEntity })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('cards/:cardId/comments')
  createComment(
    @Body() commentDto: CreateCommentDto,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Req() req,
  ) {
    return this.usersService.createComment(commentDto, cardId, req.user.id);
  }

  @ApiOperation({ summary: 'Update comment' })
  @ApiResponse({ status: 200, type: Object })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Put('comments/:commentId')
  updateComment(
    @Body() commentDto: CreateCommentDto,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Req() req,
  ) {
    return this.usersService.updateComment(commentDto, commentId, req.user.id);
  }

  @ApiOperation({ summary: 'Find need count comments' })
  @ApiResponse({ status: 200, type: [CommentEntity] })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('cards/:cardId/comments')
  findAllComments(@Param('cardId', ParseIntPipe) cardId: number) {
    return this.usersService.findAllComments(cardId);
  }

  @ApiOperation({ summary: 'Find need count comments' })
  @ApiResponse({ status: 200, type: CommentEntity })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('cards/:cardId/comments')
  findComments(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.usersService.findComments(cardId, page, limit);
  }

  @ApiOperation({ summary: 'Remove comment' })
  @ApiResponse({ status: 200, type: Object })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete('comments/:commentId')
  removeComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Req() req,
  ) {
    return this.usersService.removeComment(commentId, req.user.id);
  }
}
