// src/Materia/Materia.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body,HttpCode, HttpStatus,NotFoundException,BadRequestException,InternalServerErrorException, UseGuards } from '@nestjs/common';
import { Materia } from './Materia.entity'; 
import { MateriaService } from './Materia.service'; 
import { JwtRolesGuard } from '../Auth/jwt-roles.guard';
import { Roles } from '../Auth/roles.decorator';

@Controller('Materia') 
export class MateriaController {

  constructor(private readonly MateriaService: MateriaService) {}

  @Get('obtenerMaterias') // GET /Materia/ObtenerMaterias 
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Materia[]> {
    try {
      console.log('Obteniendo todos los Materias desde el controlador...');
      return await this.MateriaService.findAll();
    } catch (error) {
      console.error('Error al obtener Materias:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al obtener los Materias.');
    }
  }

  //@Get(':id') // GET /Materia/:id
  //findOne(@Param('id') id: string): string {
   //return `Esta acción devuelve el Materia con ID: ${id}`;
  //}

  @UseGuards(JwtRolesGuard)
  @Roles('Coordinador')
  @Post('agregarMateria') // POST /Materia/agregarMateria
  @HttpCode(HttpStatus.CREATED) 
  async create(@Body() createMateriaDto: Materia): Promise<Materia> {
    try {
      return await this.MateriaService.create(createMateriaDto);
    } catch (error) {
      console.error('Error al crear Materia:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo crear el Materia: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al crear el Materia.');
    }
  }

  @Put('actualizarMateria/:id') // PUT /Materia/actualizarMateria/:id
  @HttpCode(HttpStatus.OK) 
  async update(@Param('id') id: string, @Body() updateMateriaDto: Materia): Promise<Materia | null> {
    try {
      const updatedMateria = await this.MateriaService.update(id, updateMateriaDto);
      if (!updatedMateria) {
        throw new NotFoundException(`Materia con ID ${id} no encontrado.`);
      }
      return updatedMateria;
    } catch (error) {
      console.error('Error al actualizar Materia:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo actualizar el Materia: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al actualizar el Materia.');
    }
  }

  @Delete('borrarMateria/:id') // DELETE /Materia/borrarMateria/:id
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<String> {
    try {
      await this.MateriaService.remove(id);
      return `Se elimino al Materia con id: ${id}`;
    } catch (error) {
      console.error('Error al eliminar Materia:', error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Materia con ID ${id} no encontrado.`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al eliminar el Materia.');
    }
  }
}