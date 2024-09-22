import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../common/decorators/user.decorator';
import { ChannelsService } from './channels.service';
import { Users } from '../entities/Users';
import { PostChatDto } from './dto/post-chat.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

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

  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: multer.diskStorage({
        destination(req, file, cb) {
          cb(null, 'uploads/');
        },
        filename(req, file, cb) {
          const ext = path.extname(file.originalname);
          cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    }),
  )
  @Post(':name/images')
  postImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('url') url,
    @Param('name') name,
    @User() user: Users,
  ) {
    return this.channelsService.postChatImages(url, name, files, user.id);
  }

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
