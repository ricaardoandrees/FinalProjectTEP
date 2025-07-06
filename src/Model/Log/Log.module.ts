import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './Log.entity';
import { LogController } from './Log.controller'; 
import { LogService } from './log.service';
import { LoggingInterceptor } from './logging.interceptor';

@Module({
    imports: [TypeOrmModule.forFeature([Log])],
    controllers: [LogController],
    providers: [LogService, LoggingInterceptor],
    exports: [LogService],
})
export class LogModule {}