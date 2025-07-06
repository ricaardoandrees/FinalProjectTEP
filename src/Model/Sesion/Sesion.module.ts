import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sesion } from './Sesion.entity';
import { SesionController } from './Sesion.controller'; 


@Module({
    imports: [TypeOrmModule.forFeature([Sesion])],
    controllers: [SesionController]
})
export class SesionModule {}