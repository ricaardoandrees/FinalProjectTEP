import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coordinador } from './Coordinador.entity';
import { CoordinadorController } from './Coordinador.controller'; 
import { CoordinadorService } from './Coordinador.service';

@Module({
    imports: [TypeOrmModule.forFeature([Coordinador])],
    controllers: [CoordinadorController],
    providers: [CoordinadorService]
})
export class CoordinadorModule {}