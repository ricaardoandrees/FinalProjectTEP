import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coordinador } from './Coordinador.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Coordinador])]
})
export class CoordinadorModule {}