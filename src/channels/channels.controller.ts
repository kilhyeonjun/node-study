import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../common/decorators/user.decorator';
import { ChannelsService } from './channels.service';
import { Users } from '../entities/Users';
import { PostChatDto } from './dto/post-chat.dto';

@ApiTags('CHANNEL')
@Controller('api/workspaces/:url/channels')
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}
  @Get()
  getAllChannels(@Param('url') url: string, @User() user) {
    return this.channelsService.getWorkspaceChannels(url, user.id);
  }

  @Post()
  createChannels() {}

  @Get(':name')
  getSpecificChannel() {}

  @Get(':name/chats')
  getChats(
    @Param('url') url: string,
    @Param('name') name: string,
    @Query() query,
    @Param() param,
  ) {
    console.log(query.perPage, query.Page);
    console.log(param.id, param.url);
    return this.channelsService.getWorkspaceChannelChats(
      url,
      name,
      query.perPage,
      query.page,
    );
  }

  @Post(':name/chats')
  async postChat(
    @Param('url') url,
    @Param('name') name,
    @Body() body: PostChatDto,
    @User() user: Users,
  ) {
    return this.channelsService.postChat({
      url,
      name,
      content: body.content,
      myId: user.id,
    });
  }

  @Post(':name/images')
  postImages(@Body() body) {}

  @Get(':name/unreads')
  getUnreads(
    @Param('url') url: string,
    @Param('name') name: string,
    @Query('after') after: string,
  ) {
    return this.channelsService.getChannelUnreadsCount(url, name, after);
  }

  @Get(':name/members')
  getAllMembers(@Param('url') url: string, @Param('name') name: string) {
    return this.channelsService.getWorkspaceChannelMembers(url, name);
  }

  @Post(':name/members')
  inviteMembers() {}
}
