import pgp from 'pg-promise';
import { Receita } from '../entities/receita';

export class ReceitaRepository {
  private receitas: Receita[];
  private pgpClient;

  constructor() {
    this.receitas = [];
    this.pgpClient = pgp()(
      'postgres://postgres:postgres@localhost:5432/postgres',
    );
  }

  async insert(receita: Receita): Promise<void> {
    await this.pgpClient.query(
      `insert into receita (id, name, type, prepare, portions) values ($1, $2, $3, $4, $5)`,
      [
        receita.id,
        receita.nome,
        receita.tipo,
        receita.preparo,
        receita.porcoes,
      ],
    );
    this.receitas.push(receita);
  }

  async findByName(name: string): Promise<Receita | undefined> {
    const [result] = await this.pgpClient.query(
      'select * from receita where name = $1',
      [name],
    );
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

  async updatePreparo(name: string, prepare: string) {
    const receita = (await this.findByName(name)) as Receita;
    this.receitas = this.receitas.filter((r) => r.nome !== name);
    receita.preparo = prepare;
    this.receitas.push(receita);
  }

  remove(name: string) {
    this.receitas = this.receitas.filter((r) => r.nome !== name);
  }

  async findAll() {
    return this.pgpClient.query('select * from receita');
  }
}
