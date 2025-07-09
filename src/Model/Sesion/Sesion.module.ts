import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sesion } from './Sesion.entity';
import { SesionController } from './Sesion.controller'; 
import { SesionService } from './Sesion.service'; 
import { TutorModule } from '../Tutor/Tutor.module';
import { MateriaModule } from '../Materia/Materia.module';
import { UsuarioModule } from '../Usuario/Usuario.module';

@Module({
    imports: [TypeOrmModule.forFeature([Sesion]), TutorModule, MateriaModule, UsuarioModule],
    controllers: [SesionController],
    providers: [SesionService],
    exports: [TypeOrmModule.forFeature([Sesion]), SesionService],
})
export class SesionModule {}