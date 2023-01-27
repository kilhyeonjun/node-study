import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  GetUserOutboundPort,
  GetUserOutboundPortInputDto,
  GetUserOutboundPortOutputDto,
} from '../outbound-port/get-user.outbound-port';

export class GetUserRepository implements GetUserOutboundPort {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(
    params: GetUserOutboundPortInputDto,
  ): Promise<GetUserOutboundPortOutputDto> {
    return this.userRepository.findOne({ where: { email: params.email } });
  }
}
