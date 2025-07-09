import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../Usuario/Usuario.entity';
import { JwtModule } from '@nestjs/jwt';
import { Coordinador } from '../Coordinador/Coordinador.entity';
import { Estudiante } from '../Estudiante/Estudiante.entity';
import { Tutor } from '../Tutor/Tutor.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Usuario, Coordinador, Estudiante, Tutor]),
        JwtModule.register({
            secret: 'superSecretKey',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {} 