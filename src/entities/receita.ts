export class Receita {
  public id: string;
  public nome: string;
  public tipo: string;
  public preparo: string;
  public porcoes: number;

  constructor(nome: string, sabor: string, preparo: string, porcoes: number) {
    this.id = Math.random().toString();
    this.nome = nome;
    this.tipo = sabor;
    this.preparo = preparo;
    this.porcoes = porcoes;
  }
}
