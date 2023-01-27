import { PartialType, PickType } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';

export class GetUserOutboundPortInputDto extends PickType(User, ['email']) {}

export class GetUserOutboundPortOutputDto extends PartialType(User) {}

export const GET_USER_OUTBOUND_PORT = 'GET_USER_OUTBOUND_PORT' as const;

export interface GetUserOutboundPort {
  execute(
    params: GetUserOutboundPortInputDto,
  ): Promise<GetUserOutboundPortOutputDto>;
}
