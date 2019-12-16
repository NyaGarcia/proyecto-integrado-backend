import { Address } from './address.interface';

export interface UserDto {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  phone: number;
  password?: string;
  role: string;
  address?: Address;
}

export type UpdateUserDto = Partial<UserDto>;
export interface CredentialsDto {
  username?: string;
  email?: string;
  password: string;
}
