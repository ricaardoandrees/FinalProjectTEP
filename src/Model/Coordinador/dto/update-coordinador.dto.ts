import { IsString, IsOptional } from 'class-validator';

export class UpdateCoordinadorDto {
  @IsOptional()
  @IsString()
  cedula?: string;

  @IsOptional()
  @IsString()
  departamento?: string;

  @IsOptional()
  @IsString()
  extension_interna?: string;
}