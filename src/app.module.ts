import { Module } from '@nestjs/common';
import { userController } from './user.controller';

@Module({
  imports: [],
  controllers: [userController],
  providers: [],
})
export class AppModule {}
