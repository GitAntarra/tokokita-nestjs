import { Module } from '@nestjs/common';
import { EnvConfig } from './utils/config/env.config';
import { DatabaseConfig } from './utils/config/database.config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [EnvConfig, DatabaseConfig, UsersModule],
})
export class AppModule {}
