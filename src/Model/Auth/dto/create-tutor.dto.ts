import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTutorDto {
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
  profesion?: string;

  @IsOptional()
  @IsString()
  experiencia?: string;

  @IsOptional()
  @IsString()
  telefono?: string;
}
