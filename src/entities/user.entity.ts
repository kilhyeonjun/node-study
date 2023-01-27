import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', unique: true, length: 30 })
  email: string;

  @Column('varchar', { name: 'name', length: 20 })
  name: string;

  @Column('varchar', { name: 'nickname', length: 30 })
  nickname: string;

  @Column('varchar', { name: 'role', length: 10 })
  role: string;

  @Column('varchar', { name: 'password', length: 70 })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
