// src/Solicitud/Solicitud.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Solicitud } from './Solicitud.entity'; 

@Controller('Solicitud') 
export class SolicitudController {

  @Get() // GET /Solicitud
  findAll(): string {
    return 'Esta acción devuelve todos los Solicitudes';
  }

  @Get(':id') // GET /Solicitud/:id
  findOne(@Param('id') id: string): string {
    return `Esta acción devuelve el Solicitud con ID: ${id}`;
  }

  @Post() // POST /Solicitud
  create(@Body() createSolicitudDto: Solicitud): string {
    return `Esta acción crea un nuevo Solicitud: ${JSON.stringify(createSolicitudDto)}`;
  }

  @Put(':id') // PUT /Solicitud/:id
  update(@Param('id') id: string, @Body() updateSolicitudDto: Solicitud): string {
    return `Esta acción actualiza el Solicitud con ID: ${id} con datos: ${JSON.stringify(updateSolicitudDto)}`;
  }

  @Delete(':id') // DELETE /Solicitud/:id
  remove(@Param('id') id: string): string {
    return `Esta acción elimina el Solicitud con ID: ${id}`;
  }
}