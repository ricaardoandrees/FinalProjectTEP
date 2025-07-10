import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Usuario } from '../Usuario/Usuario.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateCoordinadorDto } from './dto/create-coordinador.dto';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { CreateTutorDto } from './dto/create-tutor.dto';
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
        private entityManager: EntityManager,
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

    async registerCoordinador(createCoordinadorDto: CreateCoordinadorDto): Promise<Usuario> {
        const { nombre, correo, contrasena, cedula, departamento, extension_interna } = createCoordinadorDto;

        const existingUser = await this.usuarioRepository.findOne({ where: { correo } });
        if (existingUser) {
            throw new ConflictException('El correo ya está en uso');
        }

        const existingCedula = await this.entityManager.findOne(Coordinador, { where: { cedula } });
        if (existingCedula) {
            throw new ConflictException('La cédula ya está en uso');
        }

        let usuario = new Usuario();
        await this.entityManager.transaction(async transactionalEntityManager => {
            usuario.nombre = nombre;
            usuario.correo = correo;
            usuario.contrasena = contrasena;

            usuario = await transactionalEntityManager.save(usuario);

            const coordinador = new Coordinador();
            coordinador.id = usuario.id;
            coordinador.cedula = cedula;
            coordinador.departamento = departamento ?? ''; // Corregido
            coordinador.extension_interna = extension_interna ?? ''; // Corregido
            coordinador.usuario = usuario;

            await transactionalEntityManager.save(coordinador);
        }).catch(error => {
            throw new InternalServerErrorException('Error al registrar el coordinador', error.message);
        });

        return usuario;
    }

    async registerEstudiante(createEstudianteDto: CreateEstudianteDto): Promise<Usuario> {
        const { nombre, correo, contrasena, cedula, carrera, semestre, telefono } = createEstudianteDto;

        const existingUser = await this.usuarioRepository.findOne({ where: { correo } });
        if (existingUser) {
            throw new ConflictException('El correo ya está en uso');
        }

        const existingCedula = await this.entityManager.findOne(Estudiante, { where: { cedula } });
        if (existingCedula) {
            throw new ConflictException('La cédula ya está en uso');
        }

        let usuario = new Usuario();
        await this.entityManager.transaction(async transactionalEntityManager => {
            usuario.nombre = nombre;
            usuario.correo = correo;
            usuario.contrasena = contrasena;

            usuario = await transactionalEntityManager.save(usuario);

            const estudiante = new Estudiante();
            estudiante.id = usuario.id;
            estudiante.cedula = cedula;
            estudiante.carrera = carrera ?? ''; // Corregido
            estudiante.semestre = semestre ?? 0; // Corregido
            estudiante.telefono = telefono ?? ''; // Corregido
            estudiante.usuario = usuario;

            await transactionalEntityManager.save(estudiante);
        }).catch(error => {
            throw new InternalServerErrorException('Error al registrar el estudiante', error.message);
        });

        return usuario;
    }

    async registerTutor(createTutorDto: CreateTutorDto): Promise<Usuario> {
        const { nombre, correo, contrasena, cedula, profesion, experiencia, telefono } = createTutorDto;

        const existingUser = await this.usuarioRepository.findOne({ where: { correo } });
        if (existingUser) {
            throw new ConflictException('El correo ya está en uso');
        }

        const existingCedula = await this.entityManager.findOne(Tutor, { where: { cedula } });
        if (existingCedula) {
            throw new ConflictException('La cédula ya está en uso');
        }

        let usuario = new Usuario();
        await this.entityManager.transaction(async transactionalEntityManager => {
            usuario.nombre = nombre;
            usuario.correo = correo;
            usuario.contrasena = contrasena;

            usuario = await transactionalEntityManager.save(usuario);

            const tutor = new Tutor();
            tutor.id = usuario.id;
            tutor.cedula = cedula;
            tutor.profesion = profesion ?? ''; // Corregido
            tutor.experiencia = experiencia ?? ''; // Corregido
            tutor.telefono = telefono ?? ''; // Corregido
            tutor.usuario = usuario;

            await transactionalEntityManager.save(tutor);
        }).catch(error => {
            throw new InternalServerErrorException('Error al registrar el tutor', error.message);
        });

        return usuario;
    }
}