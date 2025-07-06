import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './Log.entity';
import { LogController } from './Log.controller'; 
import { LogService } from './Log.service';


@Module({
    imports: [TypeOrmModule.forFeature([Log])],
    controllers: [LogController],
    providers: [LogService]
})
export class LogModule {}