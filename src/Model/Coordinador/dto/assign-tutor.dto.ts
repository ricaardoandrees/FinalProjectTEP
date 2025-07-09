import { IsInt, IsNotEmpty } from 'class-validator';

export class AssignTutorDto {
  @IsNotEmpty()
  @IsInt()
  tutorId: number;

  @IsNotEmpty()
  @IsInt()
  materiaId: number;
}
