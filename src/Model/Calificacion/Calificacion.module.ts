import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calificacion } from './Calificacion.entity';
import { CalificacionController } from './Calificacion.controller'; 


@Module({
    imports: [TypeOrmModule.forFeature([Calificacion])],
    controllers: [CalificacionController]
})
export class CalificacionModule {}