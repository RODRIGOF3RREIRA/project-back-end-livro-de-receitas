import { Receita } from '../entities/receita';

export class ReceitaRepository {
  private receitas: Receita[];

  constructor() {
    this.receitas = [];
  }

  insert(receita: Receita) {
    this.receitas.push(receita);
  }

  findByName(name: string): Receita | undefined {
    return this.receitas.find((r) => r.nome === name);
  }

  updatePreparo(name: string, new_preparo: string) {
    const receita = this.findByName(name) as Receita;
    this.receitas = this.receitas.filter((r) => r.nome !== name);
    receita.preparo = new_preparo;
    this.receitas.push(receita);
  }

  remove(name: string) {
    this.receitas = this.receitas.filter((r) => r.nome !== name);
  }

  findAll() {
    return this.receitas;
  }
}
