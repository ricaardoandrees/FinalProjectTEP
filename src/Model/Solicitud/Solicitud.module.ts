import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitud } from './Solicitud.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Solicitud])],

})
export class SolicitudModule {}