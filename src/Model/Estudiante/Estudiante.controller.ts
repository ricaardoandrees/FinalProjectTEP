// src/Estudiante/Estudiante.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body,HttpCode, HttpStatus,NotFoundException,BadRequestException,InternalServerErrorException } from '@nestjs/common';
import { Estudiante } from './Estudiante.entity'; 
import { EstudianteService } from './Estudiante.service'; 

@Controller('Estudiante') 
export class EstudianteController {

  constructor(private readonly EstudianteService: EstudianteService) {}

  @Get('obtenerEstudiantes') // GET /Estudiante/ObtenerEstudiantes 
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Estudiante[]> {
    try {
      console.log('Obteniendo todos los Estudiantes desde el controlador...');
      return await this.EstudianteService.findAll();
    } catch (error) {
      console.error('Error al obtener Estudiantes:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al obtener los Estudiantes.');
    }
  }

  //@Get(':id') // GET /Estudiante/:id
  //findOne(@Param('id') id: string): string {
   //return `Esta acción devuelve el Estudiante con ID: ${id}`;
  //}

  @Post('agregarEstudiante') // POST /Estudiante/agregarEstudiante
  @HttpCode(HttpStatus.CREATED) 
  async create(@Body() createEstudianteDto: Estudiante): Promise<Estudiante> {
    try {
      return await this.EstudianteService.create(createEstudianteDto);
    } catch (error) {
      console.error('Error al crear Estudiante:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo crear el Estudiante: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al crear el Estudiante.');
    }
  }

  @Put('actualizarEstudiante/:id') // PUT /Estudiante/actualizarEstudiante/:id
  @HttpCode(HttpStatus.OK) 
  async update(@Param('id') id: string, @Body() updateEstudianteDto: Estudiante): Promise<Estudiante | null> {
    try {
      const updatedEstudiante = await this.EstudianteService.update(id, updateEstudianteDto);
      if (!updatedEstudiante) {
        throw new NotFoundException(`Estudiante con ID ${id} no encontrado.`);
      }
      return updatedEstudiante;
    } catch (error) {
      console.error('Error al actualizar Estudiante:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo actualizar el Estudiante: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al actualizar el Estudiante.');
    }
  }

  @Delete('borrarEstudiante/:id') // DELETE /Estudiante/borrarEstudiante/:id
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<String> {
    try {
      await this.EstudianteService.remove(id);
      return `Se elimino al Estudiante con id: ${id}`;
    } catch (error) {
      console.error('Error al eliminar Estudiante:', error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Estudiante con ID ${id} no encontrado.`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al eliminar el Estudiante.');
    }
  }
}