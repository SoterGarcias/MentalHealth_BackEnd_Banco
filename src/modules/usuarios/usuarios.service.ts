import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UsuariosDTO } from './usuarios.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async create(data: UsuariosDTO) {
    const usuariosExists = await this.prisma.usuarios.findUnique({
      where: {
        id: data.id,
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

  async findAll() {
    return this.prisma.usuarios.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }
}
