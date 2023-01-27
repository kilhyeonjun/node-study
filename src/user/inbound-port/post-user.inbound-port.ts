import { PartialType, PickType } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';

export class PostUserInboundPortInputDto extends PickType(User, [
  'email',
  'password',
]) {}

export class PostUserInboundPortOutputDto extends PartialType(User) {}

export const POST_USER_INBOUND_PORT = 'POST_USER_INBOUND_PORT' as const;

export interface PostUserInboundPort {
  execute(
    params: PostUserInboundPortInputDto,
  ): Promise<PostUserInboundPortOutputDto>;
}
