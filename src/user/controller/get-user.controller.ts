import { Controller, Get, Inject, Param } from '@nestjs/common';
import {
  GetUserInboundPort,
  GET_USER_INBOUND_PORT,
} from '../inbound-port/get-user.inbound-port';

@Controller('/user')
export class GetUserController {
  constructor(
    @Inject(GET_USER_INBOUND_PORT)
    private readonly getUserInboundPort: GetUserInboundPort,
  ) {}

  @Get('/email/:email')
  async getUser(@Param() params) {
    return await this.getUserInboundPort.execute(params);
  }
}
