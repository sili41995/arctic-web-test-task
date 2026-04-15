import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'This is a comment' })
  @IsString()
  @MaxLength(500)
  text: string;

  @ApiProperty({ example: 'uuid-of-the-lead' })
  @IsUUID()
  leadId: string;
}
