import { IsString, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  contrasena?: string;
}
