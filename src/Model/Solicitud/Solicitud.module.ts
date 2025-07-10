import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitud } from './Solicitud.entity';
import { SolicitudController } from './Solicitud.controller'; 
import { SolicitudService } from './Solicitud.service';
import { JwtModule } from '@nestjs/jwt';
import { SesionService } from '../Sesion/Sesion.service';
import { Sesion } from '../Sesion/Sesion.entity';
import { Tutor } from '../Tutor/Tutor.entity';
import { Materia } from '../Materia/Materia.entity';
import { Usuario } from '../Usuario/Usuario.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Solicitud, Sesion, Tutor, Materia, Usuario]),
        JwtModule.register({
            secret: 'superSecretKey', // Use the same secret as in jwt-roles.guard.ts
            signOptions: { expiresIn: '60m' }, // Example: token expires in 60 minutes
        }),
    ],
    controllers: [SolicitudController],
    providers: [SolicitudService, SesionService],
    exports: [JwtModule] // Export JwtModule if JwtService is used in other modules that import SolicitudModule
})
export class SolicitudModule {}