// src/Sesion/Sesion.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Sesion } from './Sesion.entity'; 

@Controller('Sesion') 
export class SesionController {

  @Get() // GET /Sesion
  findAll(): string {
    return 'Esta acción devuelve todos los Sesiones';
  }

  @Get(':id') // GET /Sesion/:id
  findOne(@Param('id') id: string): string {
    return `Esta acción devuelve el Sesion con ID: ${id}`;
  }

  @Post() // POST /Sesion
  create(@Body() createSesionDto: Sesion): string {
    return `Esta acción crea un nuevo Sesion: ${JSON.stringify(createSesionDto)}`;
  }

  @Put(':id') // PUT /Sesion/:id
  update(@Param('id') id: string, @Body() updateSesionDto: Sesion): string {
    return `Esta acción actualiza el Sesion con ID: ${id} con datos: ${JSON.stringify(updateSesionDto)}`;
  }

  @Delete(':id') // DELETE /Sesion/:id
  remove(@Param('id') id: string): string {
    return `Esta acción elimina el Sesion con ID: ${id}`;
  }
}