// src/Sesion/Sesion.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body,HttpCode, HttpStatus,NotFoundException,BadRequestException,InternalServerErrorException } from '@nestjs/common';
import { Sesion } from './Sesion.entity'; 
import { SesionService } from './Sesion.service'; 

@Controller('Sesion') 
export class SesionController {

  constructor(private readonly SesionService: SesionService) {}

  @Get('obtenerSesiones') // GET /Sesion/ObtenerSesions 
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Sesion[]> {
    try {
      console.log('Obteniendo todos los Sesions desde el controlador...');
      return await this.SesionService.findAll();
    } catch (error) {
      console.error('Error al obtener Sesions:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al obtener los Sesions.');
    }
  }

  //@Get(':id') // GET /Sesion/:id
  //findOne(@Param('id') id: string): string {
   //return `Esta acción devuelve el Sesion con ID: ${id}`;
  //}

  @Post('agregarSesion') // POST /Sesion/agregarSesion
  @HttpCode(HttpStatus.CREATED) 
  async create(@Body() createSesionDto: Sesion): Promise<Sesion> {
    try {
      return await this.SesionService.create(createSesionDto);
    } catch (error) {
      console.error('Error al crear Sesion:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo crear el Sesion: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al crear el Sesion.');
    }
  }

  @Put('actualizarSesion/:id') // PUT /Sesion/actualizarSesion/:id
  @HttpCode(HttpStatus.OK) 
  async update(@Param('id') id: string, @Body() updateSesionDto: Sesion): Promise<Sesion | null> {
    try {
      const updatedSesion = await this.SesionService.update(id, updateSesionDto);
      if (!updatedSesion) {
        throw new NotFoundException(`Sesion con ID ${id} no encontrado.`);
      }
      return updatedSesion;
    } catch (error) {
      console.error('Error al actualizar Sesion:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo actualizar el Sesion: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al actualizar el Sesion.');
    }
  }

  @Delete('borrarSesion/:id') // DELETE /Sesion/borrarSesion/:id
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<String> {
    try {
      await this.SesionService.remove(id);
      return `Se elimino al Sesion con id: ${id}`;
    } catch (error) {
      console.error('Error al eliminar Sesion:', error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Sesion con ID ${id} no encontrado.`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al eliminar el Sesion.');
    }
  }


  @Put('marcarSesionCompletada/:tutorId/:sesionId') // PUT /Sesion/marcarSesionCompletada/:tutorId/:sesionId
  @HttpCode(HttpStatus.OK)
  async marcarSesionCompletada(@Param('tutorId') tutorId: string,@Param('sesionId') sesionId: string): Promise<Sesion | null> {
    try {
      const sesionActualizada = await this.SesionService.marcarSesionCompletada(tutorId, sesionId);
      if (sesionActualizada === null) {
        throw new Error(`Sesion con ID ${sesionId} no encontrado para el tutor con ID ${tutorId}.`);
      }
      return sesionActualizada;
    } catch (error) {
      console.error('Error al marcar la sesión como completada:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo marcar la sesión como completada: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al marcar la sesión como completada.');
    }
  }
  
}