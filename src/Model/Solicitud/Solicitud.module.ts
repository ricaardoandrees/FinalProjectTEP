import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitud } from './Solicitud.entity';
import { SolicitudController } from './Solicitud.controller'; 

@Module({
    imports: [TypeOrmModule.forFeature([Solicitud])],
    controllers: [SolicitudController]

})
export class SolicitudModule {}