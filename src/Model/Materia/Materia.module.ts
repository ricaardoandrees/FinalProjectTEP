import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materia } from './Materia.entity';
import { MateriaController } from './Materia.controller'; 


@Module({
    imports: [TypeOrmModule.forFeature([Materia])],
    controllers: [MateriaController]
})
export class MateriaModule {}