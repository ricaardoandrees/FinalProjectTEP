import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sesion } from './Sesion.entity';
import { SesionController } from './Sesion.controller'; 
import { SesionService } from './Sesion.service'; 
import { TutorModule } from '../Tutor/Tutor.module';
import { MateriaModule } from '../Materia/Materia.module';
import { UsuarioModule } from '../Usuario/Usuario.module';
import { SolicitudModule } from '../Solicitud/Solicitud.module';
import { Solicitud } from '../Solicitud/Solicitud.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Sesion, Solicitud]),
        TutorModule,
        MateriaModule,
        UsuarioModule,
        SolicitudModule,
    ],
    controllers: [SesionController],
    providers: [SesionService],
    exports: [TypeOrmModule.forFeature([Sesion]), SesionService],
})
export class SesionModule {}