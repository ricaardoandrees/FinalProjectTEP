import { Controller, Get, Post, Put, Delete, Param, Body,HttpCode, HttpStatus,NotFoundException,BadRequestException,InternalServerErrorException, UseGuards } from '@nestjs/common';
import { Coordinador } from './Coordinador.entity'; 
import { CoordinadorService } from './Coordinador.service'; 
import { Roles } from '../Auth/roles.decorator';
import { JwtRolesGuard } from '../Auth/jwt-roles.guard';
import { AssignTutorDto } from './dto/assign-tutor.dto';
import { UpdateCoordinadorDto } from './dto/update-coordinador.dto';

@Controller('Coordinador') 
export class CoordinadorController {

  constructor(private readonly CoordinadorService: CoordinadorService) {}

  @Post('assign-tutor')
  @Roles('coordinador')
  @UseGuards(JwtRolesGuard)
  @HttpCode(HttpStatus.OK)
  async assignTutorToMateria(@Body() assignTutorDto: AssignTutorDto) {
    try {
      return await this.CoordinadorService.assignTutorToMateria(assignTutorDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al asignar el tutor.');
    }
  }

  @Get('obtenerCoordinadores') // GET /Coordinador/ObtenerCoordinadors 
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Coordinador[]> {
    try {
      console.log('Obteniendo todos los Coordinadors desde el controlador...');
      return await this.CoordinadorService.findAll();
    } catch (error) {
      console.error('Error al obtener Coordinadors:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al obtener los Coordinadors.');
    }
  }

  //@Get(':id') // GET /Coordinador/:id
  //findOne(@Param('id') id: string): string {
   //return `Esta acción devuelve el Coordinador con ID: ${id}`;
  //}

  @Post('agregarCoordinador') // POST /Coordinador/agregarCoordinador
  @HttpCode(HttpStatus.CREATED) 
  async create(@Body() createCoordinadorDto: Coordinador): Promise<Coordinador> {
    try {
      return await this.CoordinadorService.create(createCoordinadorDto);
    } catch (error) {
      console.error('Error al crear Coordinador:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo crear el Coordinador: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al crear el Coordinador.');
    }
  }

  @Put('actualizarCoordinador/:id') // PUT /Coordinador/actualizarCoordinador/:id
  @HttpCode(HttpStatus.OK) 
  async update(@Param('id') id: string, @Body() updateCoordinadorDto: UpdateCoordinadorDto): Promise<Coordinador | null> {
    try {
      const updatedCoordinador = await this.CoordinadorService.update(id, updateCoordinadorDto);
      if (!updatedCoordinador) {
        throw new NotFoundException(`Coordinador con ID ${id} no encontrado.`);
      }
      return updatedCoordinador;
    } catch (error: any) {
      console.error('Error al actualizar Coordinador:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      // Catch specific ORM errors if known, e.g., TypeORM's EntityNotFoundError
      // if (error.name === 'EntityNotFoundError') {
      //   throw new NotFoundException(`Coordinador con ID ${id} no encontrado.`);
      // }
      // If the error is an instance of a generic Error, extract its message
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo actualizar el Coordinador: ${error.message}`);
      }
      // For any other unexpected errors, throw a generic internal server error
      throw new InternalServerErrorException('Ocurrió un error inesperado al actualizar el Coordinador.');
    }
  }

  @Delete('borrarCoordinador/:id') // DELETE /Coordinador/borrarCoordinador/:id
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<String> {
    try {
      await this.CoordinadorService.remove(id);
      return `Se elimino al Coordinador con id: ${id}`;
    } catch (error) {
      console.error('Error al eliminar Coordinador:', error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Coordinador con ID ${id} no encontrado.`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al eliminar el Coordinador.');
    }
  }
}