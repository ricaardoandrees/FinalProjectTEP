import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './Usuario.entity';
import { UsuarioController } from './Usuario.controller'; 
import { UsuarioService } from './Usuario.service';
import { JwtRolesGuard } from '../Auth/jwt-roles.guard';
import { AuthModule } from '../Auth/auth.module';


@Module({

    imports: [TypeOrmModule.forFeature([Usuario]),AuthModule],
    providers: [UsuarioService,JwtRolesGuard], 
    controllers: [UsuarioController],
    exports: [TypeOrmModule.forFeature([Usuario]), UsuarioService]         
})
export class UsuarioModule {}