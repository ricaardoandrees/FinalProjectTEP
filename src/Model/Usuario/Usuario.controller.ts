import { Controller, Get, Post, Put, Delete, Param, Body,HttpCode, HttpStatus,NotFoundException,BadRequestException,InternalServerErrorException, UseGuards, Req } from '@nestjs/common';
import { Usuario } from './Usuario.entity'; 
import { UsuarioService } from './Usuario.service';
import { JwtRolesGuard } from '../Auth/jwt-roles.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('Usuario') 
export class UsuarioController {
 
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req) {
    const userId = req.user.sub;
    return this.usuarioService.getProfile(userId);
  }

  @Put('profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(@Req() req, @Body() updateProfileDto: UpdateProfileDto) {
    try{
          const userId = req.user.sub;
          const result= this.usuarioService.updateProfile(userId, updateProfileDto);
          console.log(result);
          return result;
    }
    catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al obtener los usuarios.');
    }
  }

  @Get('obtenerUsuarios') // GET /Usuario/ObtenerUsuarios 
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Usuario[]> {
    try {
      console.log('Obteniendo todos los usuarios desde el controlador...');
      return await this.usuarioService.findAll();
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al obtener los usuarios.');
    }
  }

  //@Get(':id') // GET /Usuario/:id
  //findOne(@Param('id') id: string): string {
   //return `Esta acción devuelve el Usuario con ID: ${id}`;
  //}

  @Get('obtenerPerfilPorCorreo/:email')
  @HttpCode(HttpStatus.OK)
  async getProfileByEmail(@Param('email') email: string): Promise<Usuario | null> {
    try {
      const user = await this.usuarioService.findByEmail(email);
      if (!user) {
        throw new NotFoundException(`Usuario con correo ${email} no encontrado.`);
      }
      return user;
    } catch (error) {
      console.error('Error al obtener usuario por correo:', error);
      throw new InternalServerErrorException('Ocurrió un error inesperado al obtener el usuario por correo.');
    }
  }

  @Post('agregarUsuario') // POST /Usuario/agregarUsuario
  @HttpCode(HttpStatus.CREATED) 
  async create(@Body() createUsuarioDto: Usuario): Promise<Usuario> {
    try {
      return await this.usuarioService.create(createUsuarioDto);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo crear el usuario: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al crear el usuario.');
    }
  }

  @Put('actualizarUsuario/:id') // PUT /Usuario/actualizarUsuario/:id
  @HttpCode(HttpStatus.OK) 
  async update(@Param('id') id: string, @Body() updateUsuarioDto: Usuario): Promise<Usuario | null> {
    try {
      const updatedUsuario = await this.usuarioService.update(id, updateUsuarioDto);
      if (!updatedUsuario) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
      }
      return updatedUsuario;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      if (error instanceof Error) {
        throw new BadRequestException(`No se pudo actualizar el usuario: ${error.message}`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al actualizar el usuario.');
    }
  }

  @Delete('borrarUsuario/:id') // DELETE /Usuario/borrarUsuario/:id
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<String> {
    try {
      await this.usuarioService.remove(id);
      return `Se elimino al usuario con id: ${id}`;
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado al eliminar el usuario.');
    }
  }
}