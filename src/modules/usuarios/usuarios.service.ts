import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UsuariosDTO } from './usuarios.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  // METODO PARA CRIAR UM USUARIO
  async create(data: UsuariosDTO) {
    const usuariosExists = await this.prisma.usuarios.findFirst({
      where: {
        email: data.email,
      },
    });

    if (usuariosExists) {
      throw new Error('Email já cadastrado!');
    }

    const usuarios = await this.prisma.usuarios.create({
      data,
    });

    return usuarios;
  }

  findAll() {
    return this.prisma.usuarios.findMany({
      orderBy: [
        {
          name: 'asc',
        },
      ],
    });
  }

  // METODO PARA ALTERAR UM USUARIO COM PASSAGEM DE PARAMETRO
  async update(id: number, data: UsuariosDTO) {
    const usuariosExists = await this.prisma.usuarios.findFirst({
      where: {
        id,
      },
    });

    if (!usuariosExists) {
      throw new Error('Usuário não cadastrado!');
    }

    return await this.prisma.usuarios.update({
      data,
      where: {
        id,
      },
    });
  }

  //METODO PARA DELETAR UM USUARIO
  async delete(id: number) {
    const usuariosExists = await this.prisma.usuarios.findFirst({
      where: {
        id,
      },
    });

    if (!usuariosExists) {
      throw new Error('Usuário não cadastrado!');
    }

    return await this.prisma.usuarios.delete({
      where: {
        id,
      },
    });
  }
}
