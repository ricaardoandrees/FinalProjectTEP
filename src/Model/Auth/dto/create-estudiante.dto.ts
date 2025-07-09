import { IsString, IsEmail, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateEstudianteDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @IsNotEmpty()
  @IsString()
  contrasena: string;

  @IsNotEmpty()
  @IsString()
  cedula: string;

  @IsOptional()
  @IsString()
  carrera?: string;

  @IsOptional()
  @IsInt()
  semestre?: number;

  @IsOptional()
  @IsString()
  telefono?: string;
}
