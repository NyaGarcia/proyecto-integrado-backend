import { compareSync, hashSync } from 'bcrypt';

import { Injectable } from '@nestjs/common';

@Injectable()
export class EncryptionService {
  encryptPassword(password: string): string {
    return hashSync(password, 10);
  }

  isPasswordValid(encrypted: string, password: string): boolean {
    return compareSync(password, encrypted);
  }
}
