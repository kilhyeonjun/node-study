import { PartialType, PickType } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';

export class PostUserOutboundPortInputDto extends PickType(User, [
  'email',
  'password',
]) {}

export class PostUserOutboundPortOutputDto extends PartialType(User) {}

export const POST_USER_OUTBOUND_PORT = 'POST_USER_OUTBOUND_PORT' as const;

export interface PostUserOutboundPort {
  execute(
    params: PostUserOutboundPortInputDto,
  ): Promise<PostUserOutboundPortOutputDto>;
}
