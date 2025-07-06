// src/Calificacion/Calificacion.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Calificacion } from './Calificacion.entity'; 

@Controller('Calificacion') 
export class CalificacionController {

  @Get() // GET /Calificacion
  findAll(): string {
    return 'Esta acción devuelve todos los Calificaciones';
  }

  @Get(':id') // GET /Calificacion/:id
  findOne(@Param('id') id: string): string {
    return `Esta acción devuelve el Calificacion con ID: ${id}`;
  }

  @Post() // POST /Calificacion
  create(@Body() createCalificacionDto: Calificacion): string {
    return `Esta acción crea un nuevo Calificacion: ${JSON.stringify(createCalificacionDto)}`;
  }

  @Put(':id') // PUT /Calificacion/:id
  update(@Param('id') id: string, @Body() updateCalificacionDto: Calificacion): string {
    return `Esta acción actualiza el Calificacion con ID: ${id} con datos: ${JSON.stringify(updateCalificacionDto)}`;
  }

  @Delete(':id') // DELETE /Calificacion/:id
  remove(@Param('id') id: string): string {
    return `Esta acción elimina el Calificacion con ID: ${id}`;
  }
}