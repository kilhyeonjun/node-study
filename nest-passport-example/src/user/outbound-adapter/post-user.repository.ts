import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  PostUserOutboundPort,
  PostUserOutboundPortInputDto,
  PostUserOutboundPortOutputDto,
} from '../outbound-port/post-user.outbound-port';

export class PostUserRepository implements PostUserOutboundPort {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(
    params: PostUserOutboundPortInputDto,
  ): Promise<PostUserOutboundPortOutputDto> {
    return await this.userRepository.save(params);
  }
}
