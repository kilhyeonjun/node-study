import { Module } from '@nestjs/common';
import { GetUserController } from './controller/get-user.controller';
import { GET_USER_INBOUND_PORT } from './inbound-port/get-user.inbound-port';
import { GetUserService } from './service/get-user.service';
import { GET_USER_OUTBOUND_PORT } from './outbound-port/get-user.outbound-port';
import { GetUserRepository } from './outbound-adapter/get-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { PostUserController } from './controller/post-user.controller';
import { POST_USER_INBOUND_PORT } from './inbound-port/post-user.inbound-port';
import { PostUserService } from './service/post-user.service';
import { POST_USER_OUTBOUND_PORT } from './outbound-port/post-user.outbound-port';
import { PostUserRepository } from './outbound-adapter/post-user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [GetUserController, PostUserController],
  providers: [
    {
      provide: GET_USER_INBOUND_PORT,
      useClass: GetUserService,
    },
    {
      provide: GET_USER_OUTBOUND_PORT,
      useClass: GetUserRepository,
    },
    {
      provide: POST_USER_INBOUND_PORT,
      useClass: PostUserService,
    },
    {
      provide: POST_USER_OUTBOUND_PORT,
      useClass: PostUserRepository,
    },
  ],
})
export class UserModule {}
