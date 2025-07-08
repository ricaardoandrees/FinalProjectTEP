import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calificacion } from './Calificacion.entity';
import { CalificacionController } from './Calificacion.controller'; 
import { CalificacionService } from './Calificacion.service'; 
import { SesionModule } from '../Sesion/Sesion.module';


@Module({
    imports: [TypeOrmModule.forFeature([Calificacion]), SesionModule],
    controllers: [CalificacionController],
    providers: [CalificacionService],

})
export class CalificacionModule {}