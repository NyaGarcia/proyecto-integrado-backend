import { EncryptionService } from './services/encryption.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class SharedModule {}
