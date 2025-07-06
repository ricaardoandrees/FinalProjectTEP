import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calificacion } from './Calificacion.entity';
import { CalificacionController } from './Calificacion.controller'; 
import { CalificacionService } from './Calificacion.service'; 


@Module({
    imports: [TypeOrmModule.forFeature([Calificacion])],
    controllers: [CalificacionController],
    providers: [CalificacionService]
})
export class CalificacionModule {}