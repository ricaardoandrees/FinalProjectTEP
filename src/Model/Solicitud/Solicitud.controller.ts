// src/Solicitud/Solicitud.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body,HttpCode, HttpStatus,NotFoundException,BadRequestException,InternalServerErrorException, UseGuards } from '@nestjs/common';
import { Solicitud } from './Solicitud.entity'; 
import { SolicitudService } from './Solicitud.service'; 
import { JwtRolesGuard } from '../Auth/jwt-roles.guard';
import { Roles } from '../Auth/roles.decorator';

@Controller('Solicitud') 
export class SolicitudController {

  constructor(private readonly SolicitudService: SolicitudService) {}
  @UseGuards(JwtRolesGuard)
  @Roles('Tutor')
  @Get('obtenerSolicitudes') // GET /Solicitud/ObtenerSolicituds 
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Solicitud[]> {
    try {
      console.log('Obteniendo todos los Solicituds desde el controlador...');
      return await this.SolicitudService.findAll();
    } catch (error) {
      console.error('Error al obtener Solicituds:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al obtener los Solicituds.');
    }
  }

  //@Get(':id') // GET /Solicitud/:id
  //findOne(@Param('id') id: string): string {
   //return `Esta acción devuelve el Solicitud con ID: ${id}`;
  //}
  @UseGuards(JwtRolesGuard)
  @Roles('Estudiante')
  @Post('agregarSolicitud') // POST /Solicitud/agregarSolicitud
  @HttpCode(HttpStatus.CREATED) 
  async create(@Body() createSolicitudDto: Solicitud): Promise<Solicitud> {
    try {
      return await this.SolicitudService.create(createSolicitudDto);
    } catch (error) {
      console.error('Error al crear Solicitud:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo crear el Solicitud: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al crear el Solicitud.');
    }
  }

  @Put('actualizarSolicitud/:id') // PUT /Solicitud/actualizarSolicitud/:id
  @HttpCode(HttpStatus.OK) 
  async update(@Param('id') id: string, @Body() updateSolicitudDto: Solicitud): Promise<Solicitud | null> {
    try {
      const updatedSolicitud = await this.SolicitudService.update(id, updateSolicitudDto);
      if (!updatedSolicitud) {
        throw new NotFoundException(`Solicitud con ID ${id} no encontrado.`);
      }
      return updatedSolicitud;
    } catch (error) {
      console.error('Error al actualizar Solicitud:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo actualizar el Solicitud: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al actualizar el Solicitud.');
    }
  }

  @Delete('borrarSolicitud/:id') // DELETE /Solicitud/borrarSolicitud/:id
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<String> {
    try {
      await this.SolicitudService.remove(id);
      return `Se elimino al Solicitud con id: ${id}`;
    } catch (error) {
      console.error('Error al eliminar Solicitud:', error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Solicitud con ID ${id} no encontrado.`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al eliminar el Solicitud.');
    }
  }
}