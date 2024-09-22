import { PartialType, PickType } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';

export class GetUserInboundPortInputDto extends PickType(User, ['email']) {}

export class GetUserInboundPortOutputDto extends PartialType(User) {}

export const GET_USER_INBOUND_PORT = 'GET_USER_INBOUND_PORT' as const;

export interface GetUserInboundPort {
  execute(
    params: GetUserInboundPortInputDto,
  ): Promise<GetUserInboundPortOutputDto>;
}
