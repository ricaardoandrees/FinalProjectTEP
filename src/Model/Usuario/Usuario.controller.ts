// src/Usuario/Usuario.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Usuario } from './Usuario.entity'; 

@Controller('Usuario') 
export class UsuarioController {

  @Get() // GET /Usuario
  findAll(): string {
    return 'Esta acción devuelve todos los Usuarioes';
  }

  @Get(':id') // GET /Usuario/:id
  findOne(@Param('id') id: string): string {
    return `Esta acción devuelve el Usuario con ID: ${id}`;
  }

  @Post() // POST /Usuario
  create(@Body() createUsuarioDto: Usuario): string {
    return `Esta acción crea un nuevo Usuario: ${JSON.stringify(createUsuarioDto)}`;
  }

  @Put(':id') // PUT /Usuario/:id
  update(@Param('id') id: string, @Body() updateUsuarioDto: Usuario): string {
    return `Esta acción actualiza el Usuario con ID: ${id} con datos: ${JSON.stringify(updateUsuarioDto)}`;
  }

  @Delete(':id') // DELETE /Usuario/:id
  remove(@Param('id') id: string): string {
    return `Esta acción elimina el Usuario con ID: ${id}`;
  }
}