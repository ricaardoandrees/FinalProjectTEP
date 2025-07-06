// src/Materia/Materia.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Materia } from './Materia.entity'; 

@Controller('Materia') 
export class MateriaController {

  @Get() // GET /Materia
  findAll(): string {
    return 'Esta acción devuelve todos los Materiaes';
  }

  @Get(':id') // GET /Materia/:id
  findOne(@Param('id') id: string): string {
    return `Esta acción devuelve el Materia con ID: ${id}`;
  }

  @Post() // POST /Materia
  create(@Body() createMateriaDto: Materia): string {
    return `Esta acción crea un nuevo Materia: ${JSON.stringify(createMateriaDto)}`;
  }

  @Put(':id') // PUT /Materia/:id
  update(@Param('id') id: string, @Body() updateMateriaDto: Materia): string {
    return `Esta acción actualiza el Materia con ID: ${id} con datos: ${JSON.stringify(updateMateriaDto)}`;
  }

  @Delete(':id') // DELETE /Materia/:id
  remove(@Param('id') id: string): string {
    return `Esta acción elimina el Materia con ID: ${id}`;
  }
}