import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'This is a comment' })
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  text: string;

  @ApiProperty({ example: 'uuid-of-the-lead' })
  @IsUUID()
  leadId: string;
}
