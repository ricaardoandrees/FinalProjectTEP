import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitud } from './Solicitud.entity';
import { SolicitudController } from './Solicitud.controller'; 
import { SolicitudService } from './Solicitud.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([Solicitud]),
        JwtModule.register({
            secret: 'superSecretKey', // Use the same secret as in jwt-roles.guard.ts
            signOptions: { expiresIn: '60m' }, // Example: token expires in 60 minutes
        }),
    ],
    controllers: [SolicitudController],
    providers: [SolicitudService],
    exports: [JwtModule] // Export JwtModule if JwtService is used in other modules that import SolicitudModule
})
export class SolicitudModule {}