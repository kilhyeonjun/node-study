import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/Users';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  async join(email: string, nickname: string, password: string) {
    if (!email) throw new Error('이메일이 없습니다.');
    if (!nickname) throw new Error('닉네임이 없습니다.');
    if (!password) throw new Error('비밀번호가 없습니다.');

    const user = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (user) throw new Error('이미 존재하는 사용자 입니다.');

    const hashedPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
