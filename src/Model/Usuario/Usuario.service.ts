// src/Usuario/Usuario.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Necesario si usas TypeORM
import { Repository } from 'typeorm'; // Necesario si usas TypeORM
import { Usuario } from './Usuario.entity'; // Importa tu entidad Usuario

@Injectable()
export class UsuarioService {
  constructor(
  @InjectRepository(Usuario)
    private UsuarioRepository: Repository<Usuario>,
  ) {}
 
  // Ejemplo de métodos CRUD básicos:

  async findAll(): Promise<Usuario[]> {
    // Lógica para obtener todas las Usuarioes (ej. desde la base de datos)
    console.log('Obteniendo todas las Usuarioes desde el servicio...');
    return this.UsuarioRepository.find();
  }

  async findOne(id: string): Promise<Usuario | null> { 
    // Lógica para obtener una Usuario por ID
    console.log(`Obteniendo Usuario con ID: ${id} desde el servicio...`);
    return this.UsuarioRepository.findOne({ where: { id: parseInt(id) } }); // Agregado 'where' y parseo de ID si es numérico
  }

  async create(Usuario: Usuario): Promise<Usuario> {
    // Lógica para crear una nueva Usuario
    const newUsuario = this.UsuarioRepository.create(Usuario);
    return this.UsuarioRepository.save(newUsuario);
  }

  async update(id: string, Usuario: Usuario): Promise<Usuario | null> {
    // Lógica para actualizar una Usuario existente
    await this.UsuarioRepository.update(id, Usuario);
    console.log(`Actualizando Usuario con ID: ${id} y datos: ${JSON.stringify(Usuario)} desde el servicio...`);
    return this.UsuarioRepository.findOne({ where: { id: parseInt(id) }} );
  }

  async remove(id: string): Promise<void> {
    // Lógica para eliminar una Usuario
    await this.UsuarioRepository.delete(id);
    console.log(`Eliminando Usuario con ID: ${id} desde el servicio...`);
  }
}