import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  HttpException,
  UseInterceptors,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { LoggingInterceptor } from './interceptors/logging-interceptor';
import { ResponseMsg } from './decorators/response-message-decorator';
import { ResponseTransformInterceptor } from './interceptors/response-transform-interceptor';

// 서버 루트/ nest g res todos 명렁어로 생성
// @UseInterceptors(LoggingInterceptor)
@Controller('todos')
@UseInterceptors(ResponseTransformInterceptor)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // @Post()
  // create(@Body() createTodoDto: CreateTodoDto) {
  //   return this.todosService.create(createTodoDto);
  // }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createTodoDto: CreateTodoDto) {
    const createdTodo = await this.todosService.create(createTodoDto);

    return {
      message: '성공적으로 할일이 추가 되었습니다!.',
      statusCode: 200,
      data: createTodoDto,
    };
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.todosService.findOne(+id);
  // }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('성공적으로 해당 할일을 가져왔습니다')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const foundTodo = await this.todosService.findOne(+id);

    if (foundTodo == null) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return foundTodo;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
