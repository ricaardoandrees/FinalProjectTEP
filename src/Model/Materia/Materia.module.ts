import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materia } from './Materia.entity';
import { MateriaController } from './Materia.controller'; 
import { MateriaService} from './Materia.service';


@Module({
    imports: [TypeOrmModule.forFeature([Materia])],
    controllers: [MateriaController],
    providers:[MateriaService]
})
export class MateriaModule {}