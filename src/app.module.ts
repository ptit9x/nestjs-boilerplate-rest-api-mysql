import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotoModule } from './photo/photo.module';
import { Photo } from './photo/photo.entity';
import { Users } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { JwtStrategy } from './auth/jwt.strategy';
import { ConfigService } from './config/config.service';
const config = new ConfigService('.env');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.get('MYSQL_HOST'),
      port: +config.get('MYSQL_PORT'),
      username: config.get('MYSQL_USERNAME'),
      password: config.get('MYSQL_PASSWORD'),
      database: config.get('MYSQL_DATABASE'),
      entities: [Photo, Users],
      synchronize: true,
    }),
    ConfigModule,
    PhotoModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('users');
  }
}
