import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/Users';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [WorkspacesService],
  controllers: [WorkspacesController],
})
export class WorkspacesModule {}
