// src/Calificacion/Calificacion.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body,HttpCode, HttpStatus,NotFoundException,BadRequestException,InternalServerErrorException } from '@nestjs/common';
import { Calificacion } from './Calificacion.entity'; 
import { CalificacionService } from './Calificacion.service'; 

@Controller('Calificacion') 
export class CalificacionController {

  constructor(private readonly CalificacionService: CalificacionService) {}

  @Get('obtenerCalificaciones') // GET /Calificacion/ObtenerCalificacions 
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Calificacion[]> {
    try {
      console.log('Obteniendo todos los Calificacions desde el controlador...');
      return await this.CalificacionService.findAll();
    } catch (error) {
      console.error('Error al obtener Calificacions:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al obtener los Calificacions.');
    }
  }

  //@Get(':id') // GET /Calificacion/:id
  //findOne(@Param('id') id: string): string {
   //return `Esta acción devuelve el Calificacion con ID: ${id}`;
  //}

  @Post('agregarCalificacion') // POST /Calificacion/agregarCalificacion
  @HttpCode(HttpStatus.CREATED) 
  async create(@Body() createCalificacionDto: Calificacion): Promise<Calificacion> {
    try {
      return await this.CalificacionService.create(createCalificacionDto);
    } catch (error) {
      console.error('Error al crear Calificacion:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo crear el Calificacion: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al crear el Calificacion.');
    }
  }

  @Put('actualizarCalificacion/:id') // PUT /Calificacion/actualizarCalificacion/:id
  @HttpCode(HttpStatus.OK) 
  async update(@Param('id') id: string, @Body() updateCalificacionDto: Calificacion): Promise<Calificacion | null> {
    try {
      const updatedCalificacion = await this.CalificacionService.update(id, updateCalificacionDto);
      if (!updatedCalificacion) {
        throw new NotFoundException(`Calificacion con ID ${id} no encontrado.`);
      }
      return updatedCalificacion;
    } catch (error) {
      console.error('Error al actualizar Calificacion:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo actualizar el Calificacion: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al actualizar el Calificacion.');
    }
  }

  @Delete('borrarCalificacion/:id') // DELETE /Calificacion/borrarCalificacion/:id
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<String> {
    try {
      await this.CalificacionService.remove(id);
      return `Se elimino al Calificacion con id: ${id}`;
    } catch (error) {
      console.error('Error al eliminar Calificacion:', error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Calificacion con ID ${id} no encontrado.`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al eliminar el Calificacion.');
    }
  }
}