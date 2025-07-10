// src/Sesion/Sesion.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body,HttpCode, HttpStatus,NotFoundException,BadRequestException,InternalServerErrorException, Query } from '@nestjs/common';
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
  
  @Get('filtarSesionesPorTutor/:tutorId') // GET /Sesion/filtarSesionesPorTutor/:tutorId
  @HttpCode(HttpStatus.OK)
  async filtarSesionesPorTutor(@Param('tutorId') tutorId: string): Promise<Sesion[]> {
    try {
      return await this.SesionService.filtarSesionesPorTutor(tutorId);
    } catch (error) {
      console.error('Error al filtrar sesiones por tutor:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo filtrar las sesiones por tutor: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al filtrar las sesiones por tutor.');
    }
  }

  @Get('filtarSesionesPorMateria/:materiaId') // GET /Sesion/filtarSesionesPorMateria/:materiaId
  @HttpCode(HttpStatus.OK)
  async filtarSesionesPorMateria(@Param('materiaId') materiaId: string): Promise<Sesion[]> {
    try {
      return await this.SesionService.filtarSesionesPorMateria(materiaId);
    } catch (error) {
      console.error('Error al filtrar sesiones por materia:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo filtrar las sesiones por materia: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al filtrar las sesiones por materia.');
    }
  }

  @Get('filtarSesionesPorFecha/:fechaActual') // GET /Sesion/filtarSesionesPorFecha/:fechaActual
  @HttpCode(HttpStatus.OK)
  async filtarSesionesPorFecha(@Param('fechaActual') fechaActual: string): Promise<Sesion[]> {
    try {
      const fecha = new Date(fechaActual);
      return await this.SesionService.filtarSesionesPorFecha(fecha);
    } catch (error) {
      console.error('Error al filtrar sesiones por fecha:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo filtrar las sesiones por fecha: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al filtrar las sesiones por fecha.');
    }
  }

  @Get('filtarSesionesPorEstado') // GET ej: /Sesion/filtarSesionesPorEstado?completada=true)
  @HttpCode(HttpStatus.OK) 
  async filtarSesionesPorEstado(@Query('completada') completadaString: string): Promise<Sesion[]> {
    let estado:boolean;
    if (completadaString === 'true') {
      estado = true;
    } else if (completadaString === 'false') {
      estado = false;
    } else {
      throw new BadRequestException('El parámetro "completada" debe ser "true" o "false".');
    }
    try {
      return await this.SesionService.filtarSesionesPorEstado(estado);
    } catch (error) {
      console.error('Error al filtrar sesiones por estado:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo filtrar las sesiones por estado: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al filtrar las sesiones por estado.');
    }
  }

  @Get('sesionesPorTutor') // GET /Sesion/sesionesPorTutor
  @HttpCode(HttpStatus.OK)
  async getCantidadSesionesPorTodosLosTutores(): Promise<{ tutorId: number; tutorNombre: string; cantidad: number }[]> { 
    try {
      return await this.SesionService.getCantidadSesionesPorTodosLosTutores();
    } catch (error: any) {
      console.error('Error al obtener la cantidad de sesiones por cada tutor:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al obtener la cantidad de sesiones por cada tutor.');
    }
  }

  @Get('sesionesPorMateria') // GET /Sesion/sesionesPorMateria
  @HttpCode(HttpStatus.OK)
  async getCantidadSesionesPorTodasLasMaterias(): Promise<{ materiaId: number; materiaNombre: string; cantidad: number }[]> {
    try {
      return await this.SesionService.getCantidadSesionesPorTodasLasMaterias();
    } catch (error: any) {
      console.error('Error al obtener la cantidad de sesiones por cada materia:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al obtener la cantidad de sesiones por cada materia.');
    }
  }

  @Post('crearSesionPorSolicitud')
  @HttpCode(HttpStatus.CREATED)
  async crearSesionPorSolicitud(@Body('solicitudId') solicitudId: number): Promise<Sesion> {
    try {
      return await this.SesionService.crearSesionporSolicitud(solicitudId);
    } catch (error) {
      console.error('Error al crear sesión por solicitud:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al crear la sesión por solicitud.');
    }
  }
}