import { Module } from '@nestjs/common';
import { EnvConfig } from './utils/config/env.config';

@Module({
  imports: [EnvConfig],
})
export class AppModule {}
