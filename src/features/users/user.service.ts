import { UpdateUserDto, UserDto } from './user.interface';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult, Like } from 'typeorm';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { EncryptionService } from '@shared/services/encryption.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private encryptionService: EncryptionService,
  ) {}

  findAll(): Promise<Array<User>> {
    return this.userRepository.query(`SELECT * FROM user`);
  }

  findById(id: string): Promise<User> {
    return this.userRepository.findOne({ id });
  }

  findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username: Like(username) } });
  }

  findUserAndAddresses(username: string): Promise<any> {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.addresses', 'address')
      .where('user.username LIKE :username')
      .setParameter('username', username)
      .getOne();
  }

  findUserAddresses(id: string): Promise<Array<Address>> {
    return this.addressRepository.find({ where: { user: Like(id) } });
  }

  addUser(userDto: UserDto): Promise<User> {
    const user = this.userRepository.create(userDto);
    user.password = this.encryptionService.encryptPassword(user.password);
    return this.userRepository.save(user);
  }

  deleteUser(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  updateUser(id: string, productDto: UpdateUserDto): Promise<UpdateResult> {
    if (productDto.password) {
    }
    return this.userRepository.update(id, productDto);
  }
}
