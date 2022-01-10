import { PrismaClient } from '@prisma/client';
import { ReceitaType } from '../entities/receita-type';

export class ReceitaTypeRepository {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findById(id: number): Promise<ReceitaType | undefined> {
    const result = await this.prisma.type.findUnique({
      where: {
        id,
      },
    });
    if (!result) {
      return undefined;
    }
    return new ReceitaType(result.id, result.name);
  }
}
