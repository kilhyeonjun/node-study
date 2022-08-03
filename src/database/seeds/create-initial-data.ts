import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Workspaces } from '../../entities/Workspaces';
import { Channels } from '../../entities/Channels';

export class CreateInitialDataRequest implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Workspaces)
      .values([{ id: 1, name: 'Slack', url: 'slack' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Channels)
      .values([{ id: 1, name: 'Slack', WorkspaceId: 1, private: false }])
      .execute();
  }
}
