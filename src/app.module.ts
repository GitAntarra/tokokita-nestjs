import { Module } from '@nestjs/common';
import { EnvConfig } from './utils/config/env.config';
import { DatabaseConfig } from './utils/config/database.config';

@Module({
  imports: [EnvConfig, DatabaseConfig],
})
export class AppModule {}
