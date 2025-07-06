import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './Estudiante.entity';
import { EstudianteController } from './Estudiante.controller'; 
import {EstudianteService} from './Estudiante.service';


@Module({
    imports: [TypeOrmModule.forFeature([Estudiante])],
    controllers: [EstudianteController],
    providers:[EstudianteService]
})
export class EstudianteModule {}