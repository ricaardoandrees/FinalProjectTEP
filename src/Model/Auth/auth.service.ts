import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../Usuario/Usuario.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private jwtService: JwtService,
    ) {}

    async validateUser(correo: string, contrasena: string): Promise<Usuario | null> {
        const user = await this.usuarioRepository.findOne({ where: { correo, contrasena } });
        if (user && user.activo) {
            return user;
        }
        return null;
    }

    async login(user: Usuario) {
        const payload = { sub: user.id, correo: user.correo };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }
} 