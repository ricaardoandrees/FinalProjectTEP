// src/Tutor/Tutor.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body,HttpCode, HttpStatus,NotFoundException,BadRequestException,InternalServerErrorException } from '@nestjs/common';
import { Tutor } from './Tutor.entity'; 
import { TutorService } from './Tutor.service'; 

@Controller('Tutor') 
export class TutorController {

  constructor(private readonly TutorService: TutorService) {}

  @Get('obtenerTutores') // GET /Tutor/ObtenerTutors 
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Tutor[]> {
    try {
      console.log('Obteniendo todos los Tutors desde el controlador...');
      return await this.TutorService.findAll();
    } catch (error) {
      console.error('Error al obtener Tutors:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al obtener los Tutors.');
    }
  }

  //@Get(':id') // GET /Tutor/:id
  //findOne(@Param('id') id: string): string {
   //return `Esta acción devuelve el Tutor con ID: ${id}`;
  //}

  @Post('agregarTutor') // POST /Tutor/agregarTutor
  @HttpCode(HttpStatus.CREATED) 
  async create(@Body() createTutorDto: Tutor): Promise<Tutor> {
    try {
      return await this.TutorService.create(createTutorDto);
    } catch (error) {
      console.error('Error al crear Tutor:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo crear el Tutor: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al crear el Tutor.');
    }
  }

  @Put('actualizarTutor/:id') // PUT /Tutor/actualizarTutor/:id
  @HttpCode(HttpStatus.OK) 
  async update(@Param('id') id: string, @Body() updateTutorDto: Tutor): Promise<Tutor | null> {
    try {
      const updatedTutor = await this.TutorService.update(id, updateTutorDto);
      if (!updatedTutor) {
        throw new NotFoundException(`Tutor con ID ${id} no encontrado.`);
      }
      return updatedTutor;
    } catch (error) {
      console.error('Error al actualizar Tutor:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo actualizar el Tutor: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al actualizar el Tutor.');
    }
  }

  @Delete('borrarTutor/:id') // DELETE /Tutor/borrarTutor/:id
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<String> {
    try {
      await this.TutorService.remove(id);
      return `Se elimino al Tutor con id: ${id}`;
    } catch (error) {
      console.error('Error al eliminar Tutor:', error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Tutor con ID ${id} no encontrado.`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al eliminar el Tutor.');
    }
  }
}