import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materia } from './Materia.entity';



@Module({
    imports: [TypeOrmModule.forFeature([Materia])]
})
export class MateriaModule {}