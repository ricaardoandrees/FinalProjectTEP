import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
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
import { LoggingInterceptor } from './Model/Log/logging.interceptor';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Jp30871276!',
    database: 'Esquemas Tutoria',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),MateriaModule,UsuarioModule,TutorModule,
    CoordinadorModule,SolicitudModule,SesionModule,CalificacionModule,LogModule],
  controllers: [AppController],
  providers: [AppService, {provide: APP_INTERCEPTOR, useClass: LoggingInterceptor}],
})
export class AppModule {}
