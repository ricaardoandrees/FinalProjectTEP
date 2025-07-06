import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriaModule } from 'src/Model/Materia/Materia.module';
import { UsuarioModule } from 'src/Model/Usuario/Usuario.module';
import { TutorModule } from 'src/Model/Tutor/Tutor.module';
import { CoordinadorModule } from 'src/Model/Coordinador/Coordinador.module';
import { SolicitudModule } from 'src/Model/Solicitud/Solicitud.module';
import { SesionModule } from 'src/Model/Sesion/Sesion.module';
import {CalificacionModule} from "./Model/Calificacion/Calificacion.module";
import {LogModule} from "./Model/Log/Log.module";


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Sabrina0405+',
    database: 'Esquemas Tutoria',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),MateriaModule,UsuarioModule,TutorModule,
    CoordinadorModule,SolicitudModule,SesionModule,CalificacionModule,LogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
