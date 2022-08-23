import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { WorkspacesService } from './workspaces.service';
import { Users } from '../entities/Users';

@ApiTags('WORKSPACE')
@Controller('api/workspaces')
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}

  @Get('/:myId')
  getMyWorkspaces(@User() user: Users) {
    return this.workspacesService.findMyWorkspaces(user.id);
  }

  @Post()
  createMyWorkspaces() {}

  @Get(':url/members')
  getAllMembersFromWorkspace() {}

  @Post(':url/members')
  inviteMembersFromWorkspace() {}

  @Delete(':url/members/:id')
  kickMemberFromWorkspace() {}

  @Get(':url/members/:id')
  getMemberInfoFromWorkspace() {}
}
