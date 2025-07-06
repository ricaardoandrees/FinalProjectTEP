// src/Tutor/Tutor.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Tutor } from './Tutor.entity'; 

@Controller('Tutor') 
export class TutorController {

  @Get() // GET /tutor
  findAll(): string {
    return 'Esta acción devuelve todos los tutores';
  }

  @Get(':id') // GET /tutor/:id
  findOne(@Param('id') id: string): string {
    return `Esta acción devuelve el tutor con ID: ${id}`;
  }

  @Post() // POST /tutor
  create(@Body() createTutorDto: Tutor): string {
    return `Esta acción crea un nuevo tutor: ${JSON.stringify(createTutorDto)}`;
  }

  @Put(':id') // PUT /tutor/:id
  update(@Param('id') id: string, @Body() updateTutorDto: Tutor): string {
    return `Esta acción actualiza el tutor con ID: ${id} con datos: ${JSON.stringify(updateTutorDto)}`;
  }

  @Delete(':id') // DELETE /tutor/:id
  remove(@Param('id') id: string): string {
    return `Esta acción elimina el tutor con ID: ${id}`;
  }
}