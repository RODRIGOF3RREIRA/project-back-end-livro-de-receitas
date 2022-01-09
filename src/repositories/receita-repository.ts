import { PrismaClient } from '@prisma/client';
import { Receita } from '../entities/receita';

export class ReceitaRepository {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async insert(receita: Receita): Promise<void> {
    await this.prisma.receita.create({
      data: {
        id: receita.id,
        name: receita.nome,
        type: receita.tipo,
        prepare: receita.preparo,
        portions: receita.porcoes,
      },
    });
  }

  async findByName(name: string): Promise<Receita | undefined> {
    const result = await this.prisma.receita.findFirst({
      where: {
        name,
      },
    });
    if (!result) {
      return undefined;
    }
    return new Receita(
      result.name,
      result.type,
      result.prepare,
      result.portions,
      result.id,
    );
  }

  async findById(id: number) {
    const result = await this.prisma.receita.findUnique({
      where: {
        id,
      },
    });
    if (!result) {
      return undefined;
    }
    return new Receita(
      result.name,
      result.type,
      result.prepare,
      result.portions,
      result.id,
    );
  }

  async updatePreparo(id: number, prepare: string) {
    await this.prisma.receita.update({
      data: {
        prepare,
      },
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.receita.delete({
      where: {
        id,
      },
    });
  }

  async findAll() {
    return this.prisma.receita.findMany();
  }
}
