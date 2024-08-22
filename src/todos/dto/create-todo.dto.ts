import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsBoolean,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    required: true,
    type: String,
    description: '할일 제목입니다',
    example: '테스트 api',
    default: '제목없음',
    minimum: 6,
    maximum: 30,
  })
  @IsString({
    message: '제목은 문자열만 가능합니다.',
  })
  @MinLength(6, {
    message: '제목은 6자 이상 작성해주세요.',
  })
  @MaxLength(30, {
    message: '제목은 30자를 넘길 수 없습니다.',
  })
  todo: string;

  @ApiProperty({
    required: true,
    type: Boolean,
    description: '할일 완료여부입니다',
    example: 'false',
    default: false,
  })
  @IsBoolean({
    message: 'Boolean 타입만 가능합니다.',
  })
  is_done: boolean;
}
