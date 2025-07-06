import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './Estudiante.entity';
import { EstudianteController } from './Estudiante.controller'; 


@Module({
    imports: [TypeOrmModule.forFeature([Estudiante])],
    controllers: [EstudianteController]
})
export class EstudianteModule {}