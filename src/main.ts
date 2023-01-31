import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import redis from 'redis';
import createRedisStore from 'connect-redis';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('auth 개발 문서')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Session
  const RedisStore = createRedisStore(session);
  const redisStoreInfo = {
    url: 'redis://localhost:6379', // 레디스 호스팅 주소
    logErrors: true, // 레디스 에러 로깅
  };

  const client = redis.createClient(redisStoreInfo);

  const sessionInfo = {
    resave: false,
    saveUninitialized: false,
    secret: configService.get('cookieSecret'),
    name: 'sessionId',
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 3000,
    },
    rolling: true,
    store: new RedisStore({ client }),
  };

  app.use(session(sessionInfo));
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());

  const port = configService.get('PORT') || 8060;
  await app.listen(port);
  console.log(`Server is running at http://localhost:${port}...`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
