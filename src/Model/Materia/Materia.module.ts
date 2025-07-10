import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materia } from './Materia.entity';
import { MateriaController } from './Materia.controller'; 
import { MateriaService} from './Materia.service';
import { AuthModule } from '../Auth/auth.module';


@Module({
    imports: [TypeOrmModule.forFeature([Materia]),AuthModule ],
    controllers: [MateriaController],
    providers:[MateriaService],
    exports: [TypeOrmModule.forFeature([Materia]), MateriaService],
})
export class MateriaModule {}