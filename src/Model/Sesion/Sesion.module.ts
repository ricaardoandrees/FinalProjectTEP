import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sesion } from './Sesion.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Sesion])]
})
export class SesionModule {}