import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calificacion } from './Calificacion.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Calificacion])]
})
export class CalificacionModule {}