/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      username: 'root',
     // password: 'null',
      port: 3306,
      database: 'social_dev',  
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    
    UsersModule,
    
    PostsModule,
    
    LikesModule,
    
    CommentsModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
