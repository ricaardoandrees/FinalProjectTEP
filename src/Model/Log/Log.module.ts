import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './Log.entity';
import { LogService } from './log.service';
import { LoggingInterceptor } from './logging.interceptor';

@Module({
    imports: [TypeOrmModule.forFeature([Log])],
    providers: [LogService, LoggingInterceptor],
    exports: [LogService],
})
export class LogModule {}