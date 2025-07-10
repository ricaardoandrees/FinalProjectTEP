import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class JwtRolesGuard implements CanActivate {
    constructor(private reflector: Reflector, 
        private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('No token provided');
    const token = authHeader.split(' ')[1];
    console.log('voy a validar el token');
    try {
        console.log('estoy intentando');
        const payload = this.jwtService.verify(token, { secret: 'superSecretKey' });
        console.log('Rol extraído del token:', payload.rol); // <-- ¡Aquí está la impresión!
        request.user = payload;
        if (!roles || roles.length === 0) return true;
        if (roles.includes(payload.rol)) return true;
        throw new ForbiddenException('No tienes permisos para acceder a este recurso');
    } catch (error:any) {
            console.log(error.message);
            throw new UnauthorizedException('Token inválido o expirado');
        }
    }
} 