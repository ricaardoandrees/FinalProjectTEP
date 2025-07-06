import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './Log.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Log])]
})
export class LogModule {}