import {
  GetUserInboundPort,
  GetUserInboundPortInputDto,
  GetUserInboundPortOutputDto,
} from '../inbound-port/get-user.inbound-port';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import {
  GET_USER_OUTBOUND_PORT,
  GetUserOutboundPort,
} from '../outbound-port/get-user.outbound-port';

export class GetUserService implements GetUserInboundPort {
  constructor(
    @Inject(GET_USER_OUTBOUND_PORT)
    private readonly getUserOutboundPort: GetUserOutboundPort,
  ) {}

  async execute(
    params: GetUserInboundPortInputDto,
  ): Promise<GetUserInboundPortOutputDto> {
    const user = await this.getUserOutboundPort.execute(params);
    console.log(user);
    if (!user) throw new HttpException('NO_USER', HttpStatus.NOT_FOUND);
    return user;
  }
}
