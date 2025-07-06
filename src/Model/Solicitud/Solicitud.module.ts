import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitud } from './Solicitud.entity';
import { SolicitudController } from './Solicitud.controller'; 
import { SolicitudService } from './Solicitud.service';

@Module({
    imports: [TypeOrmModule.forFeature([Solicitud])],
    controllers: [SolicitudController],
    providers: [SolicitudService]
})
export class SolicitudModule {}