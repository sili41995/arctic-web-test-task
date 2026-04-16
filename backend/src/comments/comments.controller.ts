import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/comment.dto';

@ApiTags('comments')
@Controller('leads/:id/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all comments for a specific lead' })
  @ApiParam({ name: 'id', description: 'Lead ID', type: String })
  @ApiResponse({ status: 200, description: 'Return all comments for the lead' })
  @ApiResponse({ status: 404, description: 'Lead not found' })
  findAll(@Param('id') id: string) {
    return this.commentsService.findAllByLead(id);
  }

  @Post()
  @ApiOperation({ summary: 'Add a comment to a lead' })
  @ApiParam({ name: 'id', description: 'Lead ID', type: String })
  @ApiResponse({ status: 201, description: 'Comment added successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Lead not found' })
  addComment(
    @Param('id') id: string,
    @Body() createCommentDto: Omit<CreateCommentDto, 'leadId'>,
  ) {
    return this.commentsService.create({
      ...createCommentDto,
      leadId: id,
    });
  }
}
