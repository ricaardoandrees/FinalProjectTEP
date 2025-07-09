import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sesion } from './Sesion.entity';
import { SesionController } from './Sesion.controller'; 
import { SesionService } from './Sesion.service'; 

@Module({
    imports: [TypeOrmModule.forFeature([Sesion])],
    controllers: [SesionController],
    providers: [SesionService],
    exports: [TypeOrmModule.forFeature([Sesion]), SesionService],
})
export class SesionModule {}