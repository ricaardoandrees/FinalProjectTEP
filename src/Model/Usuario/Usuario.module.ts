import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './Usuario.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    providers: [],       // aquí irán UsuarioService
    controllers: [],     // aquí irán UsuarioController
    exports: [],         // exporta servicio si lo usan otros módulos
})
export class UsuarioModule {}