import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './Log.entity';
import { LogController } from './Log.controller'; 


@Module({
    imports: [TypeOrmModule.forFeature([Log])],
    controllers: [LogController]
})
export class LogModule {}