export class Receita {
  public id: number;
  public nome: string;
  public tipo: string;
  public preparo: string;
  public porcoes: number;

  constructor(
    nome: string,
    tipo: string,
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
