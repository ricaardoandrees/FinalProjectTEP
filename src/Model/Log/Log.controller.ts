// src/Log/Log.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Log } from './Log.entity'; 

@Controller('Log') 
export class LogController {

  @Get() // GET /Log
  findAll(): string {
    return 'Esta acción devuelve todos los Loges';
  }

  @Get(':id') // GET /Log/:id
  findOne(@Param('id') id: string): string {
    return `Esta acción devuelve el Log con ID: ${id}`;
  }

  @Post() // POST /Log
  create(@Body() createLogDto: Log): string {
    return `Esta acción crea un nuevo Log: ${JSON.stringify(createLogDto)}`;
  }

  @Put(':id') // PUT /Log/:id
  update(@Param('id') id: string, @Body() updateLogDto: Log): string {
    return `Esta acción actualiza el Log con ID: ${id} con datos: ${JSON.stringify(updateLogDto)}`;
  }

  @Delete(':id') // DELETE /Log/:id
  remove(@Param('id') id: string): string {
    return `Esta acción elimina el Log con ID: ${id}`;
  }
}