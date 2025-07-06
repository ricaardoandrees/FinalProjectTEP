// src/Coordinador/Coordinador.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body,HttpCode, HttpStatus,NotFoundException,BadRequestException,InternalServerErrorException } from '@nestjs/common';
import { Coordinador } from './Coordinador.entity'; 
import { CoordinadorService } from './Coordinador.service'; 

@Controller('Coordinador') 
export class CoordinadorController {

  constructor(private readonly CoordinadorService: CoordinadorService) {}

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
  async update(@Param('id') id: string, @Body() updateCoordinadorDto: Coordinador): Promise<Coordinador | null> {
    try {
      const updatedCoordinador = await this.CoordinadorService.update(id, updateCoordinadorDto);
      if (!updatedCoordinador) {
        throw new NotFoundException(`Coordinador con ID ${id} no encontrado.`);
      }
      return updatedCoordinador;
    } catch (error) {
      console.error('Error al actualizar Coordinador:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo actualizar el Coordinador: ${error.message}`);
      }
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