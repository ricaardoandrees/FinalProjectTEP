// src/Coordinador/Coordinador.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Coordinador } from './Coordinador.entity'; 

@Controller('Coordinador') 
export class CoordinadorController {

  @Get() // GET /Coordinador
  findAll(): string {
    return 'Esta acción devuelve todos los Coordinadores';
  }

  @Get(':id') // GET /Coordinador/:id
  findOne(@Param('id') id: string): string {
    return `Esta acción devuelve el Coordinador con ID: ${id}`;
  }

  @Post() // POST /Coordinador
  create(@Body() createCoordinadorDto: Coordinador): string {
    return `Esta acción crea un nuevo Coordinador: ${JSON.stringify(createCoordinadorDto)}`;
  }

  @Put(':id') // PUT /Coordinador/:id
  update(@Param('id') id: string, @Body() updateCoordinadorDto: Coordinador): string {
    return `Esta acción actualiza el Coordinador con ID: ${id} con datos: ${JSON.stringify(updateCoordinadorDto)}`;
  }

  @Delete(':id') // DELETE /Coordinador/:id
  remove(@Param('id') id: string): string {
    return `Esta acción elimina el Coordinador con ID: ${id}`;
  }
}