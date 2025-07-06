import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './Usuario.entity';
import { UsuarioController } from './Usuario.controller'; 


@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    providers: [],       
    controllers: [UsuarioController],      
    exports: [],         
})
export class UsuarioModule {}