import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coordinador } from './Coordinador.entity';
import { CoordinadorController } from './Coordinador.controller'; 


@Module({
    imports: [TypeOrmModule.forFeature([Coordinador])],
    controllers: [CoordinadorController]
})
export class CoordinadorModule {}