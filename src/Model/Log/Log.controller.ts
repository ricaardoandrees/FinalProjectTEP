// src/Log/Log.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body,HttpCode, HttpStatus,NotFoundException,BadRequestException,InternalServerErrorException } from '@nestjs/common';
import { Log } from './Log.entity'; 
import { LogService } from './Log.service'; 

@Controller('Log') 
export class LogController {

  constructor(private readonly LogService: LogService) {}

  @Get('obtenerLogs') // GET /Log/ObtenerLogs 
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Log[]> {
    try {
      console.log('Obteniendo todos los Logs desde el controlador...');
      return await this.LogService.findAll();
    } catch (error) {
      console.error('Error al obtener Logs:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al obtener los Logs.');
    }
  }

  //@Get(':id') // GET /Log/:id
  //findOne(@Param('id') id: string): string {
   //return `Esta acción devuelve el Log con ID: ${id}`;
  //}

  @Post('agregarLog') // POST /Log/agregarLog
  @HttpCode(HttpStatus.CREATED) 
  async create(@Body() createLogDto: Log): Promise<Log> {
    try {
      return await this.LogService.create(createLogDto);
    } catch (error) {
      console.error('Error al crear Log:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo crear el Log: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al crear el Log.');
    }
  }

  @Put('actualizarLog/:id') // PUT /Log/actualizarLog/:id
  @HttpCode(HttpStatus.OK) 
  async update(@Param('id') id: string, @Body() updateLogDto: Log): Promise<Log | null> {
    try {
      const updatedLog = await this.LogService.update(id, updateLogDto);
      if (!updatedLog) {
        throw new NotFoundException(`Log con ID ${id} no encontrado.`);
      }
      return updatedLog;
    } catch (error) {
      console.error('Error al actualizar Log:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo actualizar el Log: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al actualizar el Log.');
    }
  }

  @Delete('borrarLog/:id') // DELETE /Log/borrarLog/:id
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<String> {
    try {
      await this.LogService.remove(id);
      return `Se elimino al Log con id: ${id}`;
    } catch (error) {
      console.error('Error al eliminar Log:', error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Log con ID ${id} no encontrado.`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al eliminar el Log.');
    }
  }
}