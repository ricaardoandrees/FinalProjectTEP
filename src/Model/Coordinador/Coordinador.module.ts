import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coordinador } from './Coordinador.entity';
import { CoordinadorController } from './Coordinador.controller'; 
import { CoordinadorService } from './Coordinador.service';
import { Tutor } from '../Tutor/Tutor.entity';
import { Materia } from '../Materia/Materia.entity';
import { AuthModule } from '../Auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Coordinador, Tutor, Materia]),
        AuthModule
    ],
    controllers: [CoordinadorController],
    providers: [CoordinadorService]
})
export class CoordinadorModule {}