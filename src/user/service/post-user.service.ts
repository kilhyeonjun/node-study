import {
  PostUserInboundPort,
  PostUserInboundPortInputDto,
  PostUserInboundPortOutputDto,
} from '../inbound-port/post-user.inbound-port';
import { Inject } from '@nestjs/common';
import {
  POST_USER_OUTBOUND_PORT,
  PostUserOutboundPort,
} from '../outbound-port/post-user.outbound-port';
import bcrypt from 'bcrypt';

export class PostUserService implements PostUserInboundPort {
  constructor(
    @Inject(POST_USER_OUTBOUND_PORT)
    private readonly postUserOutboundPort: PostUserOutboundPort,
  ) {}

  async execute(
    params: PostUserInboundPortInputDto,
  ): Promise<PostUserInboundPortOutputDto> {
    const hashedPassword = await bcrypt.hash(params.password, 12);
    return await this.postUserOutboundPort.execute({
      ...params,
      password: hashedPassword,
    });
  }
}
