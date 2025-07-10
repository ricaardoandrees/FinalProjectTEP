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
    try {
        const payload = this.jwtService.verify(token, { secret: 'superSecretKey' });
        request.user = payload;
        if (!roles || roles.length === 0) return true;
        if (roles.includes(payload.rol)) return true;
        throw new ForbiddenException('No tienes permisos para acceder a este recurso');
    } catch (e) {
            throw new UnauthorizedException(`Token invalido: ${e.message}`);
        }
    }
} 