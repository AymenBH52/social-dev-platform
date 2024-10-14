
export class CommentsController {
  /* constructor(
    private readonly commentsService: CommentsService,
    private readonly postsService: PostsService,
  ) {}

  @Post()
  async create(
    @Param('postId') postId: number,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: Request,
  ) {
    const post = await this.postsService.findOne(postId);
    return this.commentsService.create(createCommentDto, post, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  } */
}
