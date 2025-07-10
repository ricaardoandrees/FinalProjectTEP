import { Controller, Post, Body, UnauthorizedException, UseGuards, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateCoordinadorDto } from './dto/create-coordinador.dto';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { JwtRolesGuard } from './jwt-roles.guard';
import { Roles } from './roles.decorator';

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

    @UseGuards(JwtRolesGuard)
    @Roles('Coordinador')
    @Post('register/coordinador')
    async registerCoordinador(@Body() createCoordinadorDto: CreateCoordinadorDto) {
        try {
            const user = await this.authService.registerCoordinador(createCoordinadorDto);
            return this.authService.login(user);
        } catch (error:any) {
            console.error('Error al registrar coordinador:', error);
            if (error instanceof Error) {
                throw new BadRequestException(`No se pudo registrar el coordinador: ${error.message}`);
            }
            throw new InternalServerErrorException('Ocurrió un error inesperado al registrar el coordinador.');
        }
    }

    @UseGuards(JwtRolesGuard)
    @Roles('Coordinador')
    @Post('register/estudiante')
    async registerEstudiante(@Body() createEstudianteDto: CreateEstudianteDto) {
        try {
            const user = await this.authService.registerEstudiante(createEstudianteDto);
            return this.authService.login(user);
        } catch (error) {
            console.error('Error al registrar estudiante:', error);
            if (error instanceof Error) {
                throw new BadRequestException(`No se pudo registrar el estudiante: ${error.message}`);
            }
            throw new InternalServerErrorException('Ocurrió un error inesperado al registrar el estudiante.');
        }
    }

    @UseGuards(JwtRolesGuard)
    @Roles('Coordinador')
    @Post('register/tutor')
    async registerTutor(@Body() createTutorDto: CreateTutorDto) {
        try {
            const user = await this.authService.registerTutor(createTutorDto);
            return this.authService.login(user);
        } catch (error) {
            console.error('Error al registrar tutor:', error);
            if (error instanceof Error) {
                throw new BadRequestException(`No se pudo registrar el tutor: ${error.message}`);
            }
            throw new InternalServerErrorException('Ocurrió un error inesperado al registrar el tutor.');
        }
    }
} 