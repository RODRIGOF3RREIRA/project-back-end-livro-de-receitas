import { Receita } from '../entities/receita';
import { ReceitaRepository } from '../repositories/receita-repository';
import { ReceitaTypeRepository } from '../repositories/receita-type-repository';

export class ReceitaService {
  private receitaRepository: ReceitaRepository;
  private receitaTypeRepository: ReceitaTypeRepository;

  constructor() {
    this.receitaRepository = new ReceitaRepository();
    this.receitaTypeRepository = new ReceitaTypeRepository();
  }

  async create(
    nome: string,
    tipo: number,
    preparo: string,
    porcoes: number,
  ): Promise<Receita | Error> {
    const ReceitaType = await this.receitaTypeRepository.findById(tipo);
    if (!ReceitaType) {
      return new Error('Receita Type not found');
    }
    const receita = new Receita(nome, ReceitaType, preparo, porcoes);
    await this.receitaRepository.insert(receita);
    return receita;
  }

  async getByName(nome: string): Promise<Receita | undefined> {
    return this.receitaRepository.findByName(nome);
  }

  async update(id: number, prepare: string): Promise<Error | void> {
    const receita = await this.receitaRepository.findById(Number(id));
    if (!receita) {
      return new Error('Pokemon not found');
    }
    await this.receitaRepository.updatePreparo(id, prepare);
    return undefined;
  }

  async delete(id: number): Promise<Error | void> {
    const receita = await this.receitaRepository.findById(Number(id));
    if (!receita) {
      return new Error('receita not found');
    }
    await this.receitaRepository.remove(id);
    return undefined;
  }

  async getAll() {
    return this.receitaRepository.findAll();
  }
}
