import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateCoordinadorDto } from './dto/create-coordinador.dto';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { CreateTutorDto } from './dto/create-tutor.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { correo: string; contrasena: string }) {
        const user = await this.authService.validateUser(body.correo, body.contrasena);
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        return this.authService.login(user);
    }

    @Post('register/coordinador')
    async registerCoordinador(@Body() createCoordinadorDto: CreateCoordinadorDto) {
        const user = await this.authService.registerCoordinador(createCoordinadorDto);
        return this.authService.login(user);
    }

    @Post('register/estudiante')
    async registerEstudiante(@Body() createEstudianteDto: CreateEstudianteDto) {
        const user = await this.authService.registerEstudiante(createEstudianteDto);
        return this.authService.login(user);
    }

    @Post('register/tutor')
    async registerTutor(@Body() createTutorDto: CreateTutorDto) {
        const user = await this.authService.registerTutor(createTutorDto);
        return this.authService.login(user);
    }
} 