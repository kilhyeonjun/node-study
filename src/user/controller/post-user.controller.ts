import { Controller, Inject, UseGuards, Post, Body, Res } from '@nestjs/common';
import { LocalAuthGuard } from '../../auth/local-auth.guard';
import { LoggedInGuard } from '../../auth/logged-in.guard';
import { User } from '../../common/decorators/user.decorator';
import { Response } from 'express';
import {
  PostUserInboundPort,
  PostUserInboundPortInputDto,
  POST_USER_INBOUND_PORT,
} from '../inbound-port/post-user.inbound-port';

@Controller('/user')
export class PostUserController {
  constructor(
    @Inject(POST_USER_INBOUND_PORT)
    private readonly postUserInboundPort: PostUserInboundPort,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  logIn(@User() user) {
    return user;
  }

  @Post()
  async join(@Body() body: PostUserInboundPortInputDto) {
    return await this.postUserInboundPort.execute(body);
  }

  @UseGuards(LoggedInGuard)
  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
