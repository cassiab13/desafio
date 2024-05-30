import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './books/middleware/logger.middleware';
import { ProdutosModule } from './produtos/produtos.module';
import { ValueMiddleware } from './produtos/middleware/value.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0/books-nest'),
    BooksModule,
    ProdutosModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'books/', method: RequestMethod.POST });
    
    consumer
      .apply(ValueMiddleware)
      .forRoutes({ path: 'produtos/', method: RequestMethod.POST });
  }
}