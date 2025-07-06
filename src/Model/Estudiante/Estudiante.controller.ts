// src/Estudiante/Estudiante.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Estudiante } from './Estudiante.entity'; 

@Controller('Estudiante') 
export class EstudianteController {

  @Get() // GET /Estudiante
  findAll(): string {
    return 'Esta acción devuelve todos los Estudiantees';
  }

  @Get(':id') // GET /Estudiante/:id
  findOne(@Param('id') id: string): string {
    return `Esta acción devuelve el Estudiante con ID: ${id}`;
  }

  @Post() // POST /Estudiante
  create(@Body() createEstudianteDto: Estudiante): string {
    return `Esta acción crea un nuevo Estudiante: ${JSON.stringify(createEstudianteDto)}`;
  }

  @Put(':id') // PUT /Estudiante/:id
  update(@Param('id') id: string, @Body() updateEstudianteDto: Estudiante): string {
    return `Esta acción actualiza el Estudiante con ID: ${id} con datos: ${JSON.stringify(updateEstudianteDto)}`;
  }

  @Delete(':id') // DELETE /Estudiante/:id
  remove(@Param('id') id: string): string {
    return `Esta acción elimina el Estudiante con ID: ${id}`;
  }
}