import { ReceitaType } from './receita-type';

export class Receita {
  public id: number;
  public nome: string;
  public tipo: ReceitaType;
  public preparo: string;
  public porcoes: number;

  constructor(
    nome: string,
    tipo: ReceitaType,
    preparo: string,
    porcoes: number,
    id?: number,
  ) {
    this.id = id ?? Math.floor(Math.random() * 1000);
    this.nome = nome;
    this.tipo = tipo;
    this.preparo = preparo;
    this.porcoes = porcoes;
  }
}
