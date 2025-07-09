import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './Usuario.entity';
import { UsuarioController } from './Usuario.controller'; 
import { UsuarioService } from './Usuario.service';


@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    providers: [UsuarioService],       
    controllers: [UsuarioController],
    exports: [TypeOrmModule.forFeature([Usuario]), UsuarioService]            
})
export class UsuarioModule {}