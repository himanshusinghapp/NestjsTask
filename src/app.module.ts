import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from './kafka/kafka.module';
import { KafkaConsumerController } from './kafka/kafka.consumer';

@Module({
  imports: [
    KafkaModule,
    MongooseModule.forRoot('mongodb://localhost/NestProject'),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
  ],
  controllers: [KafkaConsumerController],
})
export class AppModule {}
