import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutor } from './Tutor.entity';
import { TutorController } from './Tutor.controller'; 
import { TutorService } from './Tutor.service';


@Module({
    controllers: [TutorController], 
    imports: [TypeOrmModule.forFeature([Tutor])],
    providers: [TutorService],
    exports: [TypeOrmModule.forFeature([Tutor]), TutorService],
})
export class TutorModule {}