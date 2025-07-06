import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutor } from './Tutor.entity';
import { TutorController } from './Tutor.controller'; 


@Module({
    controllers: [TutorController], 
    imports: [TypeOrmModule.forFeature([Tutor])]
})
export class TutorModule {}