import * as bcrypt from 'bcrypt';
import { DeepPartial, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  /**
   * Creates a user
   *
   * @param param0
   * @returns
   */
  async create({
    password,
    ...dto
  }: DeepPartial<UserEntity>): Promise<UserEntity> {
    const hashPassword = await this.hashPassword(password);

    const entity = {
      ...dto,
      password: hashPassword,
    };

    return this.repo.save(entity);
  }

  private hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  /**
   * Returns a user by their unique email address or undefined
   *
   * @param email
   * @returns
   */
  findOneByEmail(email: string) {
    return this.repo.findOne({ email });
  }
}
