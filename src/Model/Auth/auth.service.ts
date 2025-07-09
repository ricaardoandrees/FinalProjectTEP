import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../Usuario/Usuario.entity';
import { JwtService } from '@nestjs/jwt';
import { Coordinador } from '../Coordinador/Coordinador.entity';
import { Estudiante } from '../Estudiante/Estudiante.entity';
import { Tutor } from '../Tutor/Tutor.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        @InjectRepository(Coordinador)
        private coordinadorRepository: Repository<Coordinador>,
        @InjectRepository(Estudiante)
        private estudianteRepository: Repository<Estudiante>,
        @InjectRepository(Tutor)
        private tutorRepository: Repository<Tutor>,
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
        let rol = 'Unknown';
        const coordinador = await this.coordinadorRepository.findOne({ where: { id: user.id } });
        if (coordinador) rol = 'Coordinador';
        else {
            const estudiante = await this.estudianteRepository.findOne({ where: { id: user.id } });
            if (estudiante) rol = 'Estudiante';
            else {
                const tutor = await this.tutorRepository.findOne({ where: { id: user.id } });
                if (tutor) rol = 'Tutor';
            }
        }

        const payload = { sub: user.id, correo: user.correo, rol };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }
} 